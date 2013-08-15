var http = require('http');
var sys = require('sys');
var url = require('url');

var ip = "127.0.0.1";
var port = 4001;

function Server(route, handle, posts) {
  this.route = route;
  this.handle = handle;
  this.posts = posts;
}

Server.prototype.start = function() {
  http.createServer(this.handleReq.bind(this)).listen(port, ip);
  sys.puts('Server Running on ' + ip + ":" + port);
};

Server.prototype.handleReq = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("Pathname: " + pathname);

  this.route(this.handle, pathname, req, res, this.posts);
};

exports.Server = Server;
