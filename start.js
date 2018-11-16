const listeningPort = 3000;
require('browser-sync')({
    port: listeningPort,
    files: ['./'],
    // injectChanges: false,
    // logFileChanges: false,
    // logLevel: 'silent',
    // logPrefix: '',
    notify: true,
    reloadDelay: 0,
    index: 'index.html',
    server: {
        baseDir: './',
    },
    open: true
});

const http = require('http');
const querystring = require('querystring');
const fs = require('fs');


const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": 'text/plain',
        'charset': 'utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    }); //可以解决跨域的请求

    let alldata = '';
    req.on('data', function (chunk) {
        alldata += chunk;
    });
    req.on('end', function () {
        res.end('success');
        let dataObj = querystring.parse(alldata);
        fs.writeFile(JSON.parse(Object.keys(dataObj)[0]).name + ".json", JSON.stringify(JSON.parse(Object.keys(dataObj)[0]).data, null, 4), (err, data) => {
            if (err) res.end(err);
            else res.end('success');
        })
    });
});

server.listen(80);