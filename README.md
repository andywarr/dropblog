Dropblog is an infinite scroll blogging application powered by nodejs, angularjs and optionally dropbox.

The code has been broken down into _client_ and _server_ code.  The _client_ code consists of the static files for the blog.  It is recommended that you serve these files using a web server such as [Nginx](http://wiki.nginx.org/Main).  The _server_ code includes the nodejs application, which serves the posts for the blog.  You can run the nodejs application using a package, such as [forever](https://github.com/nodejitsu/forever).
