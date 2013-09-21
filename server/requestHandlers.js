function posts(req, res, parsedURL, posts) {
  console.log("Request handler 'posts' was called.");

  var index = parseInt(parsedURL.query.index, 10);

  console.log(parsedURL.query.index);

  var n = parseInt(parsedURL.query.n, 10);

  if (!n) {
    n = 10;
  }

  var startPos = 0;
  var endPos = posts.posts.posts.length;
  
  if (index) {
    startPos = index;
    if (endPos > startPos + n) {
      endPos = startPos + n;
    }
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(posts.posts.posts.slice(startPos, endPos + 1)));
  res.end();
}

exports.posts = posts;
