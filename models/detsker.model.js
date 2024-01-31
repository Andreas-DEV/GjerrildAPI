const mgdb = require('mongoose')

const detskerSchema = new mgdb.Schema({
    image: {
        type: String,
        required: [true, '-> Billede er påkrævet.']
    },
    month: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    }
})

module.exports = mgdb.model('Detsker', detskerSchema, 'detsker')