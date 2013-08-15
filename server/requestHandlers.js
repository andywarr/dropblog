function posts(req, res, posts) {
  console.log("Request handler 'posts' was called.");
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(posts.posts.posts));
  res.end();
}

exports.posts = posts;
