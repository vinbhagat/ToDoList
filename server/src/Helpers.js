const Mongoose = require('mongoose');

const MongoConfig = require('./Config').MongoConfig;
const ToDoModel = require('./Model').ToDo;

class Connections {
    constructor() {
        this.connection;
    }
    connectDB(strDBName) {
        return new Promise((resolve, reject) => {
            const url = MongoConfig.connectionURI;
            const dbName = strDBName || MongoConfig.defaultDBName;

            const conn = Mongoose.createConnection(`${url}/${dbName}`, {
                useNewUrlParser: true
            });

            conn
                .on('open', (db, coll) => {
                    conn.db.listCollections().toArray((err, collName) => {
                        if (collName.length === 0) {
                            const todo = conn.model('ToDos', ToDoModel, 'ToDos');
                            var newTodo = new todo(MongoConfig.defaultToDo);
                            newTodo.save((err, todo) => {
                                console.log(todo);
                                this.connection = conn;
                                resolve(conn);
                            });
                        } else {
                            this.connection = conn;
                            resolve(conn);
                        }

                    });
                })
                .catch(err => {
                    console.log(err);
                    conn.close();
                    reject(new Error("Connection to DB failed."));
                });
        })
    }
    async getConnection(strDBName) {
        return new Promise((resolve, reject) => {
            if (!this.connection)
                this.connectDB(strDBName).then(res => {
                    resolve(res);
                }).catch(err => reject(err));
            else
                resolve(this.connection);
        })
    }
    async getCollection(collectionName) {
        return new Promise((resolve, reject) => {
            this.getConnection().then(conn => {
                conn.db.collection(collectionName, (err, coll) => {
                    if (err)
                        reject(err);
                    else
                        resolve(coll);
                });
            }).catch(err => reject(err));
        })
    }
}

module.exports = {
    Connections: new Connections()
}