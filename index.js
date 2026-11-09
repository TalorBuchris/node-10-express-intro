// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
    res.send({msg: 'hi from get endpoint ' + Date.now()});
});

app.listen(3000);