// "path" is module to perform path manipulation
// refer: https://codeforgeek.com/render-html-file-expressjs/
const path = require('path');

// Function to handle a request to get the about information
const getAbout = (req, res) => {
    res.sendFile(path.join(__dirname+'/../models/about.html'));
};

// export the callbacks
module.exports = {
    getAbout,
};