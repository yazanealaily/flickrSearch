angular.module('myApp', ["ngAnimate", "ngMessages"])
.controller('myController', function($scope, $http) {

  $scope.images = [];
  $scope.feedback = "";
  $scope.placeholder = "Enter a tag to search for";

  $scope.submit = function() {
    
    if($scope.myForm.$valid) {

        $scope.placeholder = "";

        var url = "https://api.flickr.com/services/rest";
        var api_key = "55bdcb70a85c5fda767d060652248558";
        var params = {
          method: 'flickr.photos.search',
          api_key: api_key,
          tags: $scope.search,
          format: 'json',
          nojsoncallback: 1
         }

         $scope.feedback = "Searching flickr for photos tagged with '" + $scope.search + "'.";

        $http({
          method: 'GET',
          url: url,
          params: params
        })
        .then(function(results) {
          $scope.feedback = "Found " + results.data.photos.photo.length + " results.";
          $scope.images = results;
        }, function(results) {
          $scope.feedback = "Sorry, an error has occured. Please try again.";
          console.log('error');
        });
      };
  };

});