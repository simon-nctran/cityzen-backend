const express = require('express')
const app = express();

// set up routes
const aboutRouter = require('./routes/aboutRouter');
const placesRouter = require('./routes/placesRouter');

// Get home page
app.get('/', (req, res) => {
    res.send('<H1>Cityzen</H1>')
});

// handle about requests
app.use('/about', aboutRouter);
app.use('/places', placesRouter);

app.listen(3000, () => {
    console.log('The cityzen app is listening on port 3000')
});