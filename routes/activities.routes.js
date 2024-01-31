const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Activities = require('../models/activities.model')

/* const formData = require('express-form-data')
router.use(formData.parse()) */

const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (request, response, cb) {
            cb(null, 'public/images')
        },
        filename: function (request, file, cb) {
            cb(null, file.originalname)
        }
    })
})

/* GET - ALL */
router.get('/', async (request, response) => {
    try {
        let allActivities = await Activities.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allActivities
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let activity = await Activities.findById(request.params.id)
    return response.status(200).json({
        content: activity
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let activities = new Activities(request.body)
        activities.image = request.file ? request.file.filename : null
        await activities.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: activities
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen ${error.message}`
        })
    }
})
/* router.post('/', async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let activity = new Activities(request.body)
        await roactivityoms.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: activity
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen: ${error.message}`,
            created: null
        })
    }

}) */

/* PUT */
router.put('/:id', upload.single("image"), async (request, response) => {
    try {
        if (request.file) {
            request.body.image = request.file.filename
        }
        let activity = await Activities.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (activity == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: activity
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> ${error.message}`
        })
    }
})

/* DELETE */
router.delete('/:id', async (request, response) => {
    try {
        let activity = await Activities.findByIdAndDelete(request.params.id)
        if (activity == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: activity,
            message: `-> ${request.body} blev slettet`
        })

    } catch (error) {
        return response.status(400).json({
            deleted: null,
            message: `-> ${error.message}`
        })
    }
})

module.exports = router