var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

function mainHandler(message)
{
  return JSON.parse(message).text;
}

var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data',
      function(message)
      {
        var response = mainHandler(message);
        conn.write(response);
        console.log(message);
      });
});

var static_directory = new node_static.Server(__dirname);

var server = http.createServer();
server.addListener('request', function(req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function(req,res){
    res.end();
});

sockjs_echo.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:8080' );
server.listen(8080, '0.0.0.0');
