const express = require('express');
const AddToDoRouter = express.Router();

const ConnHelper = require('../Helpers').Connections;

const ToDoModel = require('../Model').ToDo;

AddToDoRouter.post('/', (request, response) => {
    ConnHelper.getConnection().then(conn => {
        console.log('in addToDos');
        var ToDoSchema = conn.model('ToDos', ToDoModel, 'ToDos');
        ToDoSchema.estimatedDocumentCount({}, (err, count) => {
            let newToDo = new ToDoSchema({ id: `T${count + 1}`, name: request.body.name, status: 'pending' });
            newToDo.save((err, ToDo) => {
                if (err) {
                    console.log(err);
                    response.status(400).json({ error: err });
                } else {
                    console.log(ToDo);
                    response.status(200).json({ payload: ToDo });
                }
            });
        })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = {
    AddToDoRouter
}