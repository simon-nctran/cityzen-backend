const express = require('express')
const app = express();

// set up about routes
const aboutRouter = require('./routes/aboutRouter');

// Get home page
app.get('/', (req, res) => {
    res.send('<H1>Cityzen</H1>')
});

// handle about requests
app.use('/about', aboutRouter);

// use environment port or 3000
// refer: https://youtu.be/pKd0Rpw7O48?t=989
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The cityzen app is listening on port ${port}`)
});