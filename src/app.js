const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templatess/views')
const partialsPath = path.join(__dirname, '../templatess/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

 
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Ravi Mehta'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text',
        title: 'help',
        name: 'Ravi mehta'
    })
})
  
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ravi mehta',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ravi mehta',
        errorMessage: 'Page not found'
    })
}) 


app.listen(3000, () => { 
    console.log('server is up on port 3000.')
})         