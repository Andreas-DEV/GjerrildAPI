const mgdb = require('mongoose')

const homeSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, 'Mangler Titel content']
    },
    undertitle: {
        type: String,
    },
    content: {
        type: String,
        //required: [true, 'Mangler content input']
    },
    content2: {
        type: String,
        //required: [true, 'Mangler content input']
    },
    image: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Home', homeSchema, 'home')