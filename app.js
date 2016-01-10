/**
 * Created by awaseem on 15-11-21.
 */

var express = require("express");
var fs = require("fs");
var https = require("https");

var app = express();

app.use(express.static(__dirname));

https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app).listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
