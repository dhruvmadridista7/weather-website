const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');  //get path of public dir
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


// To serve the handle bars from views directory
app.get('', (req, res)  => {
    res.render('index', {
        title : 'Weather App',
        name : 'Dhruv Patel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Dhruv Patel'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is some helpful text',
        title : 'Help',
        name : 'Dhruv Patel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error : error
                })
            }

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search);

    res.send({
        products : []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Dhruv Patel',
        errorMessage : 'Help artical not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'DhruvPatel',
        errorMessage : 'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port',port);
})