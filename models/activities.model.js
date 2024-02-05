const mgdb = require('mongoose')

const activitiesSchema = new mgdb.Schema({
    underside: {
        type: String,
        required: [true, '-> Underside navn mangler.']
    },
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

module.exports = mgdb.model('Activities', activitiesSchema, 'activities')