// import express from 'express';


import path from 'path';
import open from 'open';
import compression from 'compression'; // makes file smaller

/*eslint-disable no-console */

var express = require('express');
var app = express();
// var port = 5000;

app.set('port', (process.env.PORT || 5000)); // new

app.use(compression()); // 8f enable compression
app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// NEW
app.listen(app.get('port'), function() {
    // open(`http://localhost:${port}`);
    console.log('Node app is running on port', app.get('port'));
});
// app.listen(process.env.PORT || 5000);



// OLD
// app.listen(port, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         open(`http://localhost:${port}`);
//     }
// });
