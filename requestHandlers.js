function posts(req, res, posts) {
  console.log("Request handler 'posts' was called.");
  
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Posts");
  res.end();
}

exports.posts = posts;