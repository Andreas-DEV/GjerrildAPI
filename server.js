const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const PORT = 1337

const username = encodeURIComponent("admin");
const password = encodeURIComponent("adminpassword");


/* APP */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* STATIC FILES */
app.use(express.static('public'))

const mgdb = require('mongoose')
mgdb.connect( `mongodb+srv://${username}:${password}@cluster0.ad0z395.mongodb.net/
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
app.use('/content', require('./routes/content.routes'))
app.use('/nyhed', require('./routes/nyheder.routes'))
app.use('/events', require('./routes/events.routes'))
app.use('/rooms', require('./routes/rooms.routes'))
app.use('/restaurant', require('./routes/restaurant.routes'))
app.use('/activities', require('./routes/activities.routes'))
app.use('/images', require('./routes/images.routes'))
app.use('/happens', require('./routes/detsker.routes'))

// NO MATCH IN DATABASE
app.get('*', async (request, response) => {
    response.status(404).json({
        message: "Intet matcher dette i databasen"
    })
})

//OPSTART
app.listen(PORT, () =>
    console.log(`-> GjerrildAPI opstartet på port: ${PORT}`))