var fs = require('fs');
var http = require('http');
var static = require('node-static');
var sys = require('sys');
var url = require('url');

var ip = 127.0.0.1;
var port = 4000;
var basedir = './app/';
var postsdir = './app/views/posts/';

var feed = {posts : []};

this.getPosts = function() {
  feed.posts = [];

  var files = fs.readdirSync(postsdir);
  
  for (var i = 0; i < files.length; i++) {

    // Get file info
    var fileStats = fs.statSync(postsdir + files[i]);
    
    // Get file content
    var fileContent = fs.readFileSync(postsdir + files[i], 'utf8');
    
    // Push file info and content to feed object
    feed.posts.push({
      title: files[i],
      created: fileStats.ctime,
      modified: fileStats.mtime,
      content: fileContent
    });
  }

  // Sort posts by date created (reverse order)
  this.sortPosts('-created');
};

this.sortPosts = function(by) {
  var sortOrder = 1;
  if(by[0] === "-") {
    sortOrder = -1;
    by = by.substr(1, by.length - 1);
  }

  feed.posts.sort(function(a,b) {
     var result = (a[by] < b[by]) ? -1 : (a[by] > b[by]) ? 1 : 0;
     return result * sortOrder;
  });
};

this.handleReq = function(req, res) { 
  var info = url.parse(req.url, true);
  if (info.pathname.indexOf('/posts') == 0) {
    this.getPosts();

    var startPos = info.query.index;
    var endPos = startPos + 10;
    if (endPos > feed.posts.length - 1) {
      endPos = feed.posts.length - 1
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(feed.posts.slice(startPos, endPos + 1)));
    res.end();
  }
  else {
    this.staticServer.serve(req, res);
  }
}; 

this.getPosts();
this.staticServer = new static.Server(basedir);
http.createServer(this.handleReq.bind(this)).listen(port, ip);
sys.puts('Server Running on ' + port);
