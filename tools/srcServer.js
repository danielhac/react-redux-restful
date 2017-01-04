import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev'; // changed to .prod from .dev
import open from 'open';

/* eslint-disable no-console */

const port = 2000;
const app = express();
const compiler = webpack(config);

app.set('port', (process.env.PORT || port)); // new

// Configuring Express
app.use(require('webpack-dev-middleware')(compiler, {
    // No info in terminal when it runs
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Tell Express what files we want it to serve. Since this is a SPA,  we use index.hml
// *: Any request received, returns index.html
app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(app.get('port'), function() {
    open(`http://localhost:${port}`);
    console.log('Node app is running on port', app.get('port'));
});

// app.listen(port, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         open(`http://localhost:${port}`);
//     }
// });
