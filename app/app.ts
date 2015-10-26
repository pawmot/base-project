/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import * as express from 'express';

var app = express();

app.use('/static', express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
