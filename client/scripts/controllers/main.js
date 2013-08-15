'use strict';

angular.module('myApp', ['ngSanitize', 'infinite-scroll'])
  .controller('PostsCtrl', function ($scope, $http) {
    $scope.posts = [];
    $scope.busy = false;
    $scope.index = 0;

    $scope.formatDate = function(c, m) {
      var created = new Date(c);
      var modified = new Date(m);
      
      if (modified > created) {
        console.log("File has been modified");

      }
      else {
        return "Created on " + created.format("dddd, mmmm dS, yyyy");
      }
    };

    $scope.getMoreContent = function() {
      console.log($scope.index);
      $scope.url = "/posts?index=" + $scope.index;
      $http.get($scope.url).success(function(data, status, headers, config) {
        if ($scope.busy) return;
        $scope.busy = true;

        for (var i = 0; i < data.length; i++) {
          $scope.posts.push(data[i]);
          $scope.index++;
        }

        $scope.busy = false;
      });
    };
  });
