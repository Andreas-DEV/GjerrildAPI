const mgdb = require('mongoose')

const nyhedsSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    nyhed: {
        type: String,
        required: [true, '-> Nyhed mangles']
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Nyheder', nyhedsSchema, 'nyhed')