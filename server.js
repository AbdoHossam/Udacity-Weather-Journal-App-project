// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware')

const app = express();
// Start up an instance of app

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));
app.use(cors());
// Cors for cross origin allowance
app.use(
        function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*")
            res.header('Access-Control-Allow-Headers', 'Origin, x-Requsted-With, Content-Type, Accept')
            next()
        }
    )
    // Initialize the main project folder



// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running on port: ${port}`)
}

//get function

app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

//post function

app.post('/add', addData);

function addData(request, response) {
    projectData = {}
    projectData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }

    console.log("project Data",projectData);
}