var http = require('http');
var sys = require('sys');
var url = require('url');

function Server(router, handle, posts, ip, port) {
  this.router = router;
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
  var parsedURL = url.parse(req.url);

  this.router.route(this.handle, parsedURL, req, res, this.posts);
};

exports.Server = Server;
