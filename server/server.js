var http = require('http');
var sys = require('sys');
var url = require('url');

function Server(route, handle, posts, ip, port) {
  this.route = route;
  this.handle = handle;
  this.posts = posts;
  this.ip = ip;
  this.port = port;
}

Server.prototype.start = function() {
  http.createServer(this.handleReq.bind(this)).listen(this.port, this.ip);
  sys.puts('Server Running on ' + this.ip + ":" + this.port);
};

Server.prototype.handleReq = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("Pathname: " + pathname);

  this.route(this.handle, pathname, req, res, this.posts);
};

exports.Server = Server;
