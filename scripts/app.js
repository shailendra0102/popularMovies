define(function(jquery){
    return angular.module('MovieRestAPI',['ui.router','movie-list'])//,'movie-details'

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('movie', {
                url: '/movie',
                templateUrl: 'views/movie-list.html',
                controller:'movieCtrl',
                resolve:{
                    movieList:function(Movie){
                        return Movie.getPopularMovies();
                    }
                }
            })
            .state('movie.grid',{
                url:'/grid/:page',
                templateUrl:"views/grid-view.html",
                controller:'gridCtrl',

            })
            .state('movie.tile',{
                url:'/tile/:page',
                templateUrl:"views/tile-view.html",
                controller:'gridCtrl',
            })
            .state('details', {
                url: '/details/:id',
                templateUrl: 'views/movie-details.html',
                controller:'movieDetailsCtrl',
                resolve:{
                    movieDetail:function($stateParams,Movie){
                        return Movie.getMovieDetails($stateParams.id);
                    },
                    loadDependency:function(Movie){
                        return Movie.loadDependency();
                    }
                }      
            });   
            $urlRouterProvider.otherwise('/movie/grid/1');     
    })
    .directive("loader", function ($rootScope) {
        return function ($scope, element, attrs) {
            $scope.$on("loader_show", function () {

                document.getElementById('loaderDiv').style.display = 'block';
            });
            $scope.$on("loader_hide", function () {
                document.getElementById('loaderDiv').style.display = 'none';
            });
        };
    });
});