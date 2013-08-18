var static = require('node-static');

function Router() {
  this.staticServer = new static.Server('../client');
}

Router.prototype.route = function(handle, pathname, req, res, posts) {
  console.log("Routing request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res, posts);
  }
  else {
    this.staticServer.serve(req, res);
  }
}

exports.Router = Router;
