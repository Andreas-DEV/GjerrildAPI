const express = require('express')
const router = express.Router()


/* NYHEDS MODELLEN */
const Nyheder = require('../models/nyheder.model')

const formData = require('express-form-data')
router.use(formData.parse())

/* GET /*ALL */

router.get('/', async (request, response) => {
    try {
        let allNyheder = await Nyheder.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allNyheder
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let nyhed = await Nyheder.findById(request.params.id)
    return response.status(200).json({
        nyhed: nyhed
    })
})

/* POST */
router.post('/', async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let nyhed = new Nyheder(request.body)
        await nyhed.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: nyhed
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen ${error.message}`
        })
    }
})

/* PUT */
router.put('/:id', async (request, response) => {
    try {
        let nyhed = await Nyheder.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (nyhed == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: nyhed
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
        let nyhed = await Nyheder.findByIdAndDelete(request.params.id)
        if (nyhed == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: nyhed,
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