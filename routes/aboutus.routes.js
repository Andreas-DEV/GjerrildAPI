const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Aboutus = require('../models/aboutus.model')

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
        let allAbout = await Aboutus.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allAbout
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let aboutus = await Aboutus.findById(request.params.id)
    return response.status(200).json({
        content: aboutus
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let aboutus = new Aboutus(request.body)
        aboutus.image = request.file ? request.file.filename : null
        await aboutus.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: aboutus
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen ${error.message}`
        })
    }
})

/* PUT */
router.put('/:id', upload.single("image"), async (request, response) => {
    try {
        if (request.file) {
            request.body.image = request.file.filename
        }
        let aboutus = await Aboutus.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (aboutus == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: aboutus
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
        let aboutus = await Aboutus.findByIdAndDelete(request.params.id)
        if (aboutus == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: aboutus,
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