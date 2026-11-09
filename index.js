// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

const express = require('express');
const app = express();
app.use(express.json());

app.post('/action', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            msg: 'body is malformed'
        });
    }
    else {
        if (req.body.action === 'joke') {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode');
            const data = await response.json();
            res.json({ joke: data.joke.toUpperCase() });
        } else if (req.body.action === 'cat fact') {
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', { headers: { "x-api-key": process.env.CAT_API_KEY } })
            const data = await response.json();
            res.json({ length: data.length });
        }
        else {
            return res.status(400).json({
                msg: 'body is malformed'
            });
        }
    }
})



app.get('/greet', (req, res) => {
    res.send({ msg: 'hi from get endpoint ' + new Date().toISOString() });
});

app.get('/greet/:name', (req, res) => {
    console.log(`i got name: ${req.params.name}`);
    res.json({ "msg": `got name: ${req.params.name}` });
})

app.get('/test', async (req, res) => {
    let answer = await fetch('http://localhost:3000/greet/Bob');
    answer = await answer.json();

    if (answer.msg === 'got name: Bob')
        res.json({ result: 'ok' })
    else
        res.json({ result: 'fail' })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});