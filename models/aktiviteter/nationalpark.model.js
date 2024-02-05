const mgdb = require('mongoose')

const nationalparkSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    content: {
        type: String,
        required: [true, '-> Content mangles']
    },
    content2: {
        type: String,
        required: [true, '-> Content mangles']
    },
    content3: {
        type: String,
        required: [true, '-> Content mangles']
    },
    content4: {
        type: String,
        required: [true, '-> Content mangles']
    },
    image: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Nationalpark', nationalparkSchema, 'nationalpark')