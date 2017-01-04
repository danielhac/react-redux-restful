// This script copies src/index.html into /dist/index.html
import fs from 'fs'; // incl with Node and useful for interacting with file system
import cheerio from 'cheerio'; // handy way to interact with an in-memory DOM using jQuery selectors
import colors from 'colors'; // colors for console log statements

/*eslint-disable no-console */

// reads HTML file and pass it to Cheerio
fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if (err) {
        return console.log(err);
    }

    const $ = cheerio.load(markup);

    // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('index.html written to /dist'.green);
    });
});
