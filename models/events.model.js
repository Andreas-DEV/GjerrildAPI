const mgdb = require('mongoose')

const eventsSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    event: {
        type: String,
        required: [true, '-> Event mangles']
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Events', eventsSchema, 'events')