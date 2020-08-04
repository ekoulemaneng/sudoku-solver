// Require Express et set an instance
const express = require('express');
const app = express();
//--------

// Static files
app.use(express.static('public'));
//--------

// Module to allow others domains to communicate with this server
const cors = require('cors');
const { query } = require('express');
app.use(cors());
//--------

//-------
const { solve } = require('./sudoku');
//-------

// Set routes

app.get('/', (req, res) => res.send("/public/index.html"));

app.get('/api/solve', (req, res) => {
    let input = req.query.grid;
    res.json({output: solve(input)});
});

app.use((err, req, res, next) => res.status(500).send('Something broke!'));

app.use((req, res, next) => res.status(404).send('Sorry cant find that!'));

app.listen(3000);



