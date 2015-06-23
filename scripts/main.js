requirejs.config({
  /*baseUrl: 'scripts/',*/
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'angular': '../bower_components/angular/angular.min',
    'angular-ui-router':'../bower_components/angular-ui-router/release/angular-ui-router.min',
    'lodash':'../bower_components/lodash/lodash.min',
    'restangular':'../bower_components/restangular/dist/restangular.min',
    'dirpagination':'../bower_components/angular-utils-pagination/dirPagination',
    'service':'service',
    'app': 'app',
    'movie-list':'movie-list-module/movie-list-app',
    'movie-details-app':'movie-details-module/movie-details-app',
    'ocLazyLoad': '../bower_components/oclazyload/dist/ocLazyLoad.require'
  },
  shim: {    
    'angular':{
      exports: 'angular'
    },    
    'app':{
      deps: ['ocLazyLoad','angular-ui-router','angular','movie-list']
    },    
    'movie-list': {
      deps: ['angular','dirpagination','ocLazyLoad','service'],
    },
    
    'dirpagination':{
      deps: ['angular']
    },
    'angular-ui-router':{
      deps: ['angular']
    },
    'service':{
      deps: ['angular','restangular','ocLazyLoad']
    },
    'restangular':{
      deps: ['angular','lodash']
    },
    'movie-details-app':{
      deps: ['app', 'service']
    },
    'ocLazyLoad':{
      deps: ['angular']
    }
    
  }
});

// Start the main app logic.
requirejs(['app'], function() {
  angular.bootstrap(document.body, ['MovieRestAPI']);
});
