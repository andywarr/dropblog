var static = require('node-static');

function Router() {
  this.staticServer = new static.Server('../client');
}

Router.prototype.route = function(handle, parsedURL, req, res, posts) {
  console.log("Routing request for " + parsedURL.pathname + "?" + parsedURL.query);
  if (typeof handle[parsedURL.pathname] === 'function') {
    handle[parsedURL.pathname](req, res, parsedURL, posts);
  }
  else {
    this.staticServer.serve(req, res);
  }
}

exports.Router = Router;
