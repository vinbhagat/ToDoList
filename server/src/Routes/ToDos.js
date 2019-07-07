const express = require('express');
const TodoRouter = express.Router();

const ConnHelper = require('../Helpers').Connections;
const ToDoModel = require('../Model').ToDo;

TodoRouter.post('/', (request, response) => {
    fetchToDos(request, response, true);
});

TodoRouter.post('/add', (request, response) => {
    // fetchToDos(request, response);
    console.log(request.body);
    ConnHelper.getConnection().then(conn => {
        console.log('in addToDo');
        var ToDoSchema = conn.model('ToDos', ToDoModel, 'ToDos');
        if (!request.body.id) {
            let toDoData = new ToDoSchema({ name: request.body.name, status: request.body.status });
            toDoData.save((err, toDo) => {
                if (err) {
                    console.log(err);
                    response.status(400).json({ error: 'Save Failed' });
                } else {
                    fetchToDos(request, response, false);
                }
            });
        } else {
            ToDoSchema.findOneAndUpdate({ _id: request.body.id }, { status: request.body.status, name: request.body.name }, { useFindAndModify: false }, (err, res) => {
                if (err) {
                    console.log(err);
                    response.status(400).json({ error: err });
                } else {
                    // response.status(200).json({ payload: res });
                    fetchToDos(request, response);
                }
            })
        }
    })
    // response.status(200).json({ payload: 'Added ToDo' });
});

fetchToDos = (request, response, filtered) => {
    ConnHelper.getCollection('ToDos').then(coll => {
        var callbackFetchToDos = (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).json(err)
            }
            res.toArray().then(arr => {
                console.log(arr);
                response.status(200).json({ payload: arr });
            });
        }
        if (filtered && request.body && request.body.status) {
            coll.find({ status: request.body.status }, callbackFetchToDos);
        } else {
            coll.find({}, callbackFetchToDos);
        }
    }).catch(err => console.log(err));
}

TodoRouter.patch('/', (request, response) => {
    ConnHelper.getConnection().then(conn => {
        console.log('in changeStatus');
        let ToDoSchema = conn.model('ToDos', ToDoModel, 'ToDos');
        ToDoSchema.findOneAndUpdate({ _id: request.body._id }, { status: request.body.status }, { useFindAndModify: false }, (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).json({ error: err });
            } else {
                response.status(200).json({ payload: res });
            }
        })
    }).catch(err => {
        console.log(err);
    })
});

TodoRouter.delete('/', (request, response) => {
    ConnHelper.getConnection().then(conn => {
        console.log('in deleteTodo');
        let ToDoSchema = conn.model('ToDos', ToDoModel, 'ToDos');
        ToDoSchema.findOneAndDelete({ _id: request.body.id }, { useFindAndModify: false }, (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).json({ error: err });
            } else {
                fetchToDos(request, response);
                // response.status(200).json({ payload: res });
            }
        })
    }).catch(err => {
        console.log(err);
    })
});

module.exports = {
    TodoRouter
}