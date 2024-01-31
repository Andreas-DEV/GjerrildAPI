const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Rooms = require('../models/rooms.model')

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
        let allRooms = await Rooms.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allRooms
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let rooms = await Rooms.findById(request.params.id)
    return response.status(200).json({
        content: rooms
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let rooms = new Rooms(request.body)
        rooms.image = request.file ? request.file.filename : null
        await rooms.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: rooms
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
        let rooms = new Rooms(request.body)
        await rooms.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: rooms
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen: ${error.message}`,
            created: null
        })
    }

})
 */
/* PUT */
router.put('/:id', upload.single("image"), async (request, response) => {
    try {

        if (request.file) {
            request.body.image = request.file.filename
        }
        let rooms = await Rooms.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (rooms == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: rooms
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
        let rooms = await Rooms.findByIdAndDelete(request.params.id)
        if (rooms == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: rooms,
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