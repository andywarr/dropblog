'use strict';

angular.module('myApp', ['ngSanitize', 'infinite-scroll'])
  .controller('PostsCtrl', function ($scope, $http) {
    $scope.posts = [];
    $scope.busy = false;
    $scope.index = 0;
    $scope.n = 10;

    $scope.formatDate = function(date) {
      var lastModified = new Date(date);

      return "Last modified on " + lastModified.format("dddd, mmmm dS, yyyy");
    };

    $scope.getMoreContent = function() {
      $scope.url = "/posts?index=" + $scope.index + "&n=" + $scope.n;
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
