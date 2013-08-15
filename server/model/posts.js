var fs = require('fs');

var postsdir = __dirname + '/../posts/';

function Posts() {
  this.posts = {posts:[]};  

  this.cachePosts();
}

Posts.prototype.cachePosts = function() {
  var files = fs.readdirSync(postsdir);

  for (var i = 0; i < files.length; i++) {

    // Get file info                                            
    var fileStats = fs.statSync(postsdir + files[i]);

    // Get file content                                                   
    var fileContent = fs.readFileSync(postsdir + files[i], 'utf8');

    // Push file info and content to feed object                          
    this.posts.posts.push({
      title: files[i],
      created: fileStats.ctime,
      modified: fileStats.mtime,
      content: fileContent
    });
  }
};

Posts.prototype.getPosts = function() {
  return this.posts;
};

Posts.prototype.sortPosts = function(by) {
  var sortOrder = 1;
  if(by[0] === "-") {
    sortOrder = -1;
    by = by.substr(1, by.length - 1);
  }

  this.posts.sort(function(a,b) {
     var result = (a[by] < b[by]) ? -1 : (a[by] > b[by]) ? 1 : 0;
     return result * sortOrder;
  });
};

exports.Posts = Posts;
