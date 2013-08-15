function route(handle, pathname, req, res, posts) {
  console.log("Routing request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res, posts);
  }
  else {
    console.log("No request handlers found for " + pathname);
  }
}

exports.route = route;
