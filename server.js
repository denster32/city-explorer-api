'use strict';

console.log('First server');

// *** REQUIRES ***
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express');

// *** DONT FORGET TO REQUIRE YOUR START JSON FILE
let data = require('./data/weather.json');

// *** ONCE EXPRESS IS IN, WE NEED TO USE IT
// *** app === server
const app = express();

// *** MIDDLEWARE ***
// *** cors is middleware - security guard that allows us to share resources across the internet
app.use(cors());

// *** DEFINE A PORT FOR MY SERVER TO RUN ON ***
const PORT = process.env.PORT || 3002;

// *** ENDPOINTS ***
// *** Base endpoint - proof of life
// ** 1st arg - endpoint in quotes
// ** 2nd arg - callback which will execute when someone hits that point
// *** Callback function - 2 parameters: request and response (req, res)
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

// app.get('/hello', (request, response) => {
//   console.log(request.query);

//   let firstName = request.query.firstName;
//   let lastName = request.query.lastName;

//   response.status(200).send(`Hello ${firstName} ${lastName}!  Welcome to my server!`);
// });

app.get('/weather', (req, res, next) => {
  try {
    let latInput = req.query.lat;
    let lonInput = req.query.lon;
    let searchQuery = req.query.searchQuery;
    let city = req.query.city;
    let dataToGroom = data.find(pet => pet.city === city);

  } catch (error) {
    next(error);
  }
});


// *** CLASS TO GROOM BULKY DATA ***
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.date;
    this.description = weatherObj.description;
  }
}

// *** CATCH ALL ENDPOINT - NEEDS TO BE LAST DEFINED ENDPOINT
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *** START SERVER ***
app.listen(PORT, () => console.log(`We are running on port ${PORT}`));
