const express = require('express')
const router = express.Router()


/* NYHEDS MODELLEN */
const Events = require('../models/events.model')

const formData = require('express-form-data')
router.use(formData.parse())

/* GET /*ALL */

router.get('/', async (request, response) => {
    try {
        let allEvents = await Events.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allEvents
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let event = await Events.findById(request.params.id)
    return response.status(200).json({
        event: event
    })
})

/* POST */
router.post('/', async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let event = new Events(request.body)
        await event.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: event
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
        let event = await Events.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (event == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: event
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
        let event = await Events.findByIdAndDelete(request.params.id)
        if (event == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: event,
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