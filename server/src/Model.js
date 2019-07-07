const Schema = require('mongoose').Schema;

module.exports = {
    ToDo: new Schema({
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