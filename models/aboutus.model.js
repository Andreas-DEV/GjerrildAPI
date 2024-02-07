const mgdb = require('mongoose')

const aboutSchema = new mgdb.Schema({
    title: {
        type: String,
    },
    subtitle: {
        type: String
    },
    content1: {
        type: String
    },
    content2: {
        type: String,
    },
    content3: {
        type: String,
    },
    content4: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Aboutus', aboutSchema, 'aboutus')