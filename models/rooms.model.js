const mgdb = require('mongoose')

const roomsSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, 'Mangler Titel content']
    },
    rooms: {
        type: String,
        required: [true, 'Mangler content input']
    },
    image: {
        type: String
    },
    pris: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Rooms', roomsSchema, 'rooms')