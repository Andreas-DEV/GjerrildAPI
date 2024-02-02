const mgdb = require('mongoose')

const contactSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Mangler en titel.']
    },
    subtitle: {
        type: String,
        required: [true, '-> Subtitle mangles.']
    }
})

module.exports = mgdb.model('Contact', contactSchema, 'contact')