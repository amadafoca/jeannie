// import modules
var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');
var Jeannie = require('./jeannie.js')

// variables
var sockjs_opts = {
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
};

// jeannie
var jeannie = new Jeannie();

var jeannie_sockjs = sockjs.createServer(sockjs_opts);
jeannie_sockjs.on('connection', function(conn) {
    jeannie.register(conn);
    conn.on('data', function(message) {
        jeannie.handleMessage(message);
    });
});

var server = http.createServer();
jeannie_sockjs.installHandlers(server, {prefix: '/jeannie'});

// static dir
//var static_directory = new node_static.Server(__dirname);
// server.addListener('request', function(req, res) {
//     static_directory.serve(req, res);
// });
// server.addListener('upgrade', function(req,res){
//     res.end();
// });

// start server
console.log(' [*] Listening on 0.0.0.0:8080');
server.listen(8080, '0.0.0.0');
