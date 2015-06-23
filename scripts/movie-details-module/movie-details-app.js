define(function(){
	return angular.module('movie-details',['MovieRestAPI.service'])
.controller('movieDetailsCtrl',['$scope','movieDetail','Movie','$stateParams',function($scope,movieDetail,movieService,$stateParams){
    $scope.movie=movieDetail;
    movieService.getVideos($stateParams.id).then(function(response){
        $scope.trailors=response.results;
    });
}]);
});