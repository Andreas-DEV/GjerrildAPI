const mgdb = require('mongoose')

const dyreparkSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    content: {
        type: String,
        required: [true, '-> Aktivitet mangles']
    },
    image: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Dyrepark', dyreparkSchema, 'dyrepark')