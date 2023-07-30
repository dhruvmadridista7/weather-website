const path = require('path');
const express = require('express');


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname);   //C:\Users\patel\Desktop\Node-Course\web-server\src
// console.log(__filename);  //C:\Users\patel\Desktop\Node-Course\web-server\src\app.js
// console.log(path.join(__dirname, '../public'));     //C:\Users\patel\Desktop\Node-Course\web-server\public


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');  //get path of public dir
const viewsPath = path.join(__dirname, '../templates');


// Setup handlebars engin and views location
// had to set this name as view engin and value as out hbs installed lib
app.set('view engine', 'hbs')
// add views apth to set function, in above set function we added whole handlebars to view engin
app.set('views', viewsPath);

// setup static directory to serve
// To serve the static content from public directory
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
        title : 'about this place',
        name : 'Dhruv Patel'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is some helpful text'
    })
})





// app.get('', (req, res)  => {
//     res.send('Hello Express !!!');
// })

// So we could remove it as it no longer serves much of a purpose.
// app.get('', (req, res)  => {
//     res.send('<h1>Hello Express !!!</h1>');
// })


// app.get('/help', (req, res) => {
//     res.send('Help Page');
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name : 'Dhruv',
//         Age : 24
//     });
// })
// app.get('/help', (req, res) => {
//     res.send([{
//         name : 'Dhruv',
//         Age : 24
//     },{
//         name : 'Nikhil',
//         Age : 25
//     }]);
// })



// app.get('/about', (req, res) => {
//     res.send('About Page');
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// })


// app.get('/weather', (req, res) => {
//     res.send('Get Weather Data');
// })
app.get('/weather', (req, res) => {
    res.send({
        location : 'Palanpur',
        forecast : 'It is 40 degree'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}) => {
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
    // res.send({
    //     location : 'Palanpur',
    //     forecast : 'It is 40 degree',
    //     address : req.query.address
    // });
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




// app.get('/help/*', (req, res) => {
//     res.send('Help artical not found');
// })
app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Dhruv Patel',
        errorMessage : 'Help artical not found'
    })
})

// wild card character : *
// app.get('*', (req,res) => {
//     res.send('My 404 Page');
// })
app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'DhruvPatel',
        errorMessage : 'Page Not Found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000');
})