require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const PORT = process.env.PORT

const username = encodeURIComponent("admin");
const password = encodeURIComponent("adminpassword");


/* APP */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require('cors')
app.use(cors({ origin: true }))

/* STATIC FILES */
app.use(express.static('public'))

const mgdb = require('mongoose')
mgdb.connect(`mongodb+srv://${username}:${password}@cluster0.ad0z395.mongodb.net/
`)

const db = mongoose.connection
db.on('error', (error) => console.log("ERROR: -> GjerrildAPI kunne ikke oprette adgang til MongoDB"))
db.once('open', () => console.log("SUCCESS: -> GjerrildAPI oprettede adgang til MongoDB"))

app.get('/', async (req, res) => {
    console.log('GET serverens endpoint.')
    res.status(200).json({
        message: "Velkommen til serverens start-endpoint!"
    })
})

//ROUTES
app.use('/home', require('./routes/home.routes'))
app.use('/nyhed', require('./routes/nyheder.routes'))
app.use('/events', require('./routes/events.routes'))
app.use('/rooms', require('./routes/rooms.routes'))
app.use('/restaurant', require('./routes/restaurant.routes'))
app.use('/activities', require('./routes/activities.routes'))
app.use('/galleri', require('./routes/images.routes'))
app.use('/happens', require('./routes/detsker.routes'))
app.use('/contact', require('./routes/contact.routes'))

// NO MATCH IN DATABASE
app.get('*', async (request, response) => {
    response.status(404).json({
        message: "Intet matcher dette i databasen"
    })
})

//OPSTART
app.listen(PORT, () =>
    console.log(`-> GjerrildAPI opstartet på port: ${PORT}`))