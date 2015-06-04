var Magus = require('../magus.js');

if (! process.argv[2]) {
    console.error('Download nodejs shasums.\nUsage: node download.js <file>');
    return;
}

var browser = new Magus();
browser.openTab()
    // goto url
    .goto('http://nodejs.org/download')
    // Wait till page loading
    .wait()
    // Get h1 textContent
    .eval(function(){
        var links = document.querySelectorAll('#content a');
        var a;
        for(var i = 0; i < links.length; i++) {
            a = links[i];
            if (a.textContent === 'Shasums') return a.getAttribute('href');
        }
        return null;
    })
    .download(process.argv[2])
    // Run actions sequence
    .run(function(error, file){
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log('Saved at', file);
        process.exit();
    });
