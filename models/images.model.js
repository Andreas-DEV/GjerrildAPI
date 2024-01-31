const mgdb = require('mongoose')


const imageSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Billedet mangler en titel.']
    },
    image: {
        type: String,
        required: [true, '-> Billede påkrævet.']
    }
})

module.exports = mgdb.model('Images', imageSchema, 'images')
