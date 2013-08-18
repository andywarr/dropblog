var CONFIG = require('config').Server;
var Server = require("./server").Server;
var Router = require("./router");
var requestHandlers = require("./requestHandlers");
var Posts = require("./model/posts").Posts;

var handle = {};
handle["/posts"] = requestHandlers.posts;

var posts = new Posts();

var server = new Server(Router.route, handle, posts, CONFIG.ip, CONFIG.port);
server.start();
