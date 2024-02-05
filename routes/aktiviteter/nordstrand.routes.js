const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Nordstrand = require('../../models/aktiviteter/nordstrand.model')

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
        let nordstrand = await Nordstrand.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: nordstrand
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let nordstrand = await Nordstrand.findById(request.params.id)
    return response.status(200).json({
        content: nordstrand
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let nordstrand = new Nordstrand(request.body)
        nordstrand.image = request.file ? request.file.filename : null
        await nordstrand.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: nordstrand
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
        let nordstrand = await Nordstrand.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (nordstrand == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: nordstrand
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
        let nordstrand = await Nordstrand.findByIdAndDelete(request.params.id)
        if (nordstrand == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: nordstrand,
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