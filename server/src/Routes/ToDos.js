const express = require('express');
const TodoRouter = express.Router();

const ConnHelper = require('../Helpers').Connections;
const ToDoModel = require('../Model').ToDo;

TodoRouter.post('/', (request, response) => {
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
        if (request.body && request.body.status) {
            coll.find({ status: request.body.status }, callbackFetchToDos);
        } else {
            coll.find({}, callbackFetchToDos);
        }

    })
});

TodoRouter.patch('/', (request, response) => {
    ConnHelper.getConnection().then(conn => {
        console.log('in changeStatus');
        let ToDoSchema = conn.model('ToDos', ToDoModel, 'ToDos');
        ToDoSchema.findOneAndUpdate({ id: request.body.id }, { status: request.body.status }, { useFindAndModify: false }, (err, res) => {
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
})

module.exports = {
    TodoRouter
}