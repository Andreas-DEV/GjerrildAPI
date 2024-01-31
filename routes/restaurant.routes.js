const express = require('express')
const router = express.Router()

/* CONTENT MODELLEN */
const Restaurant = require('../models/restaurant.model')

const formData = require('express-form-data')
router.use(formData.parse())

/* GET - ALL */
router.get('/', async (request, response) => {
    try {
        let allRestaurant = await Restaurant.find();
        return response.status(200).json({
            ok: "Det sker endpoint",
            content: allRestaurant
        });
    } catch (error) {
        return response.status(400).json({
            error: `GET: -> ${error.message}`
        });
    }
});

/* GET - SELECTED */
router.get('/:id', async (request, response) => {
    let restaurant = await Restaurant.findById(request.params.id)
    return response.status(200).json({
        content: restaurant
    })
})

/* POST */
router.post('/', async (request, response) => {
    console.log('-> POST REQUEST')
    try {
        let restaurant = new Restaurant(request.body)
        await restaurant.save()
        return response.status(201).json({
            message: "SUCCESS: -> Nyt DB element blev oprettet",
            created: restaurant
        })
    } catch (error) {
        return response.status(400).json({
            message: `-> Der skete en fejl i oprettelsen: ${error.message}`,
            created: null
        })
    }

})

/* PUT */
router.put('/:id', async (request, response) => {
    try {
        let restaurant = await Restaurant.findByIdAndUpdate({
            _id: request.params.id
        },
            request.body,
            {
                new: true
            })

        if (restaurant == null) {
            return response.status(404).json({
                message: `-> ${request.params.id}`,
                updated: null
            })
        }
        return response.status(201).json({
            message: "Content blev rettet",
            updated: restaurant
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
        let restaurant = await Restaurant.findByIdAndDelete(request.params.id)
        if (content == null) {
            return response.status(404).json({
                deleted: null,
                message: "-> Dette event fandes ikke og kunne ikke blive slettet"
            })
        }
        return res.status(200).json({
            deleted: restaurant,
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