define(['ocLazyLoad'],function(){

    return angular.module('movie-list',['MovieRestAPI.service','angularUtils.directives.dirPagination','oc.lazyLoad'])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        jsLoader: requirejs,
        debug: true
    });
}])

.controller('movieCtrl',['$scope','movieList','$stateParams','$state','$ocLazyLoad',function($scope,movieList,$stateParams,$state,$ocLazyLoad){
    var str=$state.$current.url.sourcePath;
    if(str.indexOf('grid')!=-1){
        $scope.currentView="grid";
    }else{
        $scope.currentView="tile";
    }
    $scope.currentPage=1;
    $scope.movies=movieList.results;
    $scope.pageChangeHandler=function(num){
        if($scope.currentView=="grid"){
            $state.go('movie.grid', {'page': num});    
        }else{
            $state.go('movie.tile', {'page': num});    
        }
        $scope.currentPage=num;
        
    }
    $scope.changeView=function(value){

        $state.go('movie.'+value, {page: $scope.currentPage}) 
        $scope.currentView=value;
    }
    $scope.load = function(id) {
        $ocLazyLoad.load('movie-details-app').then(function() {
            $state.go('details', {'id': id});
        }, function(e) {
            console.log(e);
        });
    }
}])

.controller('gridCtrl',['$scope','movieList','$stateParams','$state',function($scope,movieList,$stateParams,$state){
    $scope.pageChangeHandler($stateParams.page);
}])

.filter('youtubeEmbedUrl', function ($sce) {
    return function(videoId) {
      return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
    };
 })
.filter('searchMovie',function(){
    return function(input,keyword){
        if(typeof(keyword)!='undefined' && keyword.length>2){
            var parmas=keyword.split(':');
            var result=[];
            input.forEach(function(item,index){
                if(parmas.length>1){
                    if(item.title.toLowerCase().indexOf(parmas[0].toLowerCase())!=-1 && item.release_date.indexOf(parmas[1])!=-1){
                        result.push(item);
                    }    
                }else{
                    if(item.title.toLowerCase().indexOf(parmas[0].toLowerCase())!=-1){
                        result.push(item);
                    }    
                }
                
            })
            return result;
        }else{
            return input;     
        }
       
    }
})

});