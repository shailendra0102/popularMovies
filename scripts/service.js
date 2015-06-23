define(function(){
	return angular.module('MovieRestAPI.service',['restangular','oc.lazyLoad'])
	.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
	    $ocLazyLoadProvider.config({
	        jsLoader: requirejs,
	        debug: true
	    });
	}])
	.constant('MOVIE_BASE_URL','http://api.themoviedb.org/3/movie/')
	.constant('API_KEY','aabc900afb7001d796df7806b6284bf1')
	.config(function(RestangularProvider,MOVIE_BASE_URL){
		RestangularProvider.setBaseUrl(MOVIE_BASE_URL);
	})
	.run(function($rootScope, Restangular) {
	  	var pendingRequests = 0;
		Restangular.addRequestInterceptor(
		    function (element, operation, what, url) {
		        if (pendingRequests == 0) {
		            $rootScope.$broadcast('loader_show');
		        }
		        pendingRequests++;
		        return element;
		    }
		);

		Restangular.addResponseInterceptor(
		    function (data, operation, what, url, response, deferred) {
		        pendingRequests--;
		        if (pendingRequests == 0) {
		            $rootScope.$broadcast('loader_hide');
		        }
		        return data;
		    }
		 );

		Restangular.addErrorInterceptor(
		    function(response, deferred, responseHandler) {
		        pendingRequests--;
		        if (pendingRequests == 0) {
		            $rootScope.$broadcast('loader_hide');
		        }
		        return true; // error not handled
		    }
		);
	})
	.service('Movie',['Restangular','API_KEY','$ocLazyLoad',function(Restangular,API_KEY,$ocLazyLoad){
		var getAllPopularMovies=Restangular.all('movie/popular?api_key='+API_KEY);
		this.getPopularMovies=function(){
			return Restangular.all('popular?api_key='+API_KEY).doGET();
		};
		this.getMovieDetails=function(id){
			return Restangular.all(id+"?api_key="+API_KEY).doGET();
		}
		this.getVideos=function(id){
			return Restangular.all(id+"/videos?api_key="+API_KEY).doGET();
		}
		this.loadDependency=function(){
			return $ocLazyLoad.load('movie-details-app');
		}
	}]);
});