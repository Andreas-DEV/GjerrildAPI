const mgdb = require('mongoose')

const restaurantSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    content: {
        type: String,
        required: [true, '-> Content mangles']
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mgdb.model('Restaurant', restaurantSchema, 'restaurant')