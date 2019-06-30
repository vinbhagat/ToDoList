const MongoConfig = {
    connectionURI: "mongodb+srv://admin:adminPass@cluster0-vp5xa.mongodb.net/ToDoList?retryWrites=true",
    defaultDBName: "ToDoList",
    defaultToDo: { id: "T1", name: "Test ToDo 1", status: "pending" }
}

module.exports = {
    MongoConfig
}