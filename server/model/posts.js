var fs = require('fs');
var marked = require('marked');
var path = require('path');

var postsdir = __dirname + '/../posts/';

var getExtension = function(filename) {
  var ext = path.extname(filename||'').split('.');
  return ext[ext.length - 1];
};

function Posts() {
  this.posts = {posts:[]};  

  this.cachePosts();
}

Posts.prototype.cachePosts = function() {
  var dirs = fs.readdirSync(postsdir);

  for (var i = 0; i < dirs.length; i++) {

    var dir = dirs[i] + '/';
    var files = fs.readdirSync(postsdir + dirs[i]);

    for (var j = 0; j < files.length; j++) {
        
      if (getExtension(files[j]) === "md") {        

        // Get file info                                           
        var fileStats = fs.statSync(postsdir + dir + files[j]);
    
        // Get file content                                               
        var fileContentMarkdown = fs.readFileSync(postsdir + dir + files[j], 'utf8');

        // Convert from markdown to html
        var fileContentHTML = marked(fileContentMarkdown);

        // Push file info and content to feed object             
        this.posts.posts.push({
          title: dir,
          lastModified: fileStats.mtime,
          content: fileContentHTML
        });
      }
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
