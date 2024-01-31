const express = require('express')
const router = express.Router()


/* NYHEDS MODELLEN */
const Detsker = require('../models/detsker.model')

/* const formData = require('express-form-data')
router.use(formData.parse()) */


/* MULTER */
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (request, response, cb) {
            cb(null, 'public/images/detsker')
        },
        filename: function (request, file, cb) {
            cb(null, file.originalname)
        }
    })
})

/* GET /*ALL */
/* router.get('/', async (request, response) => {
    try {
        return response.status(200).json({
            ok: "Det sker endpoint"
        })
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        })
    }
}) */
router.get('/', async (request, response) => {
    try {
        let allDetsker = await Detsker.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            detskere: allDetsker
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let detsker = await Detsker.findById(request.params.id)
    return response.status(200).json({
        images: detsker
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let detsker = new Detsker(request.body)
        detsker.image = request.file ? request.file.filename : null
        await detsker.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: detsker
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
        let detsker = await Detsker.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (detsker == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: detsker
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
        let detsker = await Detsker.findByIdAndDelete(request.params.id)
        if (detsker == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: detsker,
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