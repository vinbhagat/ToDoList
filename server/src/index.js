const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const PORT = process.env.PORT || 3001;

const TodoRouter = require('./Routes/ToDos').TodoRouter;
// const AddTodoRouter = require('./Routes/addToDos').AddToDoRouter;

app.use('/', TodoRouter);
// app.use('/add', AddTodoRouter);
app.listen(PORT);