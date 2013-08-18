var CONFIG = require('config').Server;
var Server = require("./server").Server;
var Router = require("./router").Router;
var requestHandlers = require("./requestHandlers");
var Posts = require("./model/posts").Posts;

var handle = {};
handle["/posts"] = requestHandlers.posts;

var posts = new Posts();

var server = new Server(new Router, handle, posts, CONFIG.ip, CONFIG.port);
server.start();
