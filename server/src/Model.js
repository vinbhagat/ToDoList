const Schema = require('mongoose').Schema;

module.exports = {
    ToDo: new Schema({
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'inprogress', 'complete']
        }
    }, {
            writeConcern: {
                w: 'majority',
                j: true,
                wtimeout: 1000
            }
        })
}