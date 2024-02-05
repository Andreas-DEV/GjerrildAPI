const mgdb = require('mongoose')

const activitiesSchema = new mgdb.Schema({
    title: {
        type: String,
        required: [true, '-> Kræver en title']
    },
    links: {
        type: String
    },
    activity: {
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