const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Content = require('../models/content.model')

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
        let allContent = await Content.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allContent
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let content = await Content.findById(request.params.id)
    return response.status(200).json({
        content: content
    })
})

/* POST */
router.post('/', upload.single("image"), async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let content = new Content(request.body)
        content.image = request.file ? request.file.filename : null
        await content.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: content
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
        let content = new Content(request.body)
        await content.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: content
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
        if(request.file){
            request.body.image = request.file.filename
        }
        let content = await Content.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (content == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: content
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
        let content = await Content.findByIdAndDelete(request.params.id)
        if (content == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: content,
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