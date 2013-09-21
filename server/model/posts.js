var fs = require('fs');
var marked = require('marked');
var path = require('path');

var postsdir = __dirname + '/../posts/';

function Posts() {
  this.posts = {posts:[]};  

  this.cachePosts();
}

Posts.prototype.cachePosts = function() {
  var files = fs.readdirSync(postsdir);

  for (var i = 0; i < files.length; i++) {

    if (path.extname(files[i]) == '') {
      // Get file info                                            
      var fileStats = fs.statSync(postsdir + files[i]);
    
      // Get file content                                               
      var fileContentMarkdown = fs.readFileSync(postsdir + files[i], 'utf8');

      // Convert from markdown to html
      var fileContentHTML = marked(fileContentMarkdown);

      // Push file info and content to feed object             
      this.posts.posts.push({
        title: files[i],
        lastModified: fileStats.mtime,
        content: fileContentHTML
      });
    }
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
