var Magus = require('../magus.js');
var http = require('http');
var assert = require('assert');

var server = http.createServer(function(req, res){
    res.setHeader('set-cookie', 'test=1');
    res.end('<html><body><h1>Title</h1></body></html>');
}).listen();

var browser = new Magus();
browser.openTab()
    .goto('http://127.0.0.1:' + server.address().port)
    .wait()
    .select('h1')
    .text()
    .exec(function(value, done){
        this.currentTab().page.getCookies(function(cookies){
            console.log(cookies);
            done(null, value);
        });
    })
    .run(function(error, text){
        if (error) {
            console.error(error);
            process.exit(1);
        }

        assert(text === 'Title');
        process.exit();
    });