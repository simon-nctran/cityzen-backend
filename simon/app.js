const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('<H1>Welcome to Cityzen</H1>');
});

let i;

for (i = 0; i < 5; i++ ) {
    console.log(i);
    console.log("looped");
}