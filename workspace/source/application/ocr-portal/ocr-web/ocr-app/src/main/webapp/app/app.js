'use strict';

define(['services/utils/routeResolver' ], function() {
	
	angular.isUndefinedOrNull = function(val) {
	    return angular.isUndefined(val) || val === null 
	};
	
	var app = angular.module('ocrApp', ['localization', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngResource', 
		'ngCookies', 'ui.bootstrap', 'ui', 'ui.select2', 'highcharts-ng', 'ngTable',  'smart-table', 
		'routeResolverServices', 'underscore', 'ngProgress', 'ui.bootstrap.transition', 'angularFileUpload', 
		'ngMaps', 'ngBootstrap', 'ngWebsocket', 'angular-growl', 'leaflet-directive', 'ngTagsInput', 
		'ngDragDrop', 'treeGrid', 'angular-button-spinner', 'angularTrix', 'htmlToPdfSave','angucomplete',
		'ui.grid', 'ui.grid.grouping', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.moveColumns']);
	
	app.run(['$rootScope', '$route', '$http', '$location', 'constantService', 'localize', 'authorizationService', '$websocket',
	    'configurationService', 'uiSelect2Config', function($rootScope, $route, $http, $location, constantService, localize,
	    authorizationService, $websocket, configurationService, uiSelect2Config) {
		
		var userInfo;
		$rootScope.messagePageLocation = 'app/partials/message.html';
		
		localize.setLanguage('en-US');
        
		$rootScope.$on("$routeChangeStart", function (oldPath, newPath) {
			$rootScope.isWeb = true;
			$rootScope.pageTitle = newPath.$$route.title;
			if (newPath.$$route == undefined || newPath.$$route.isWeb) {
	        	$rootScope.layout = constantService.getWebLayout();
	            return;
	        } 
	        userInfo = authorizationService.getUserInfo();
	        if(userInfo === undefined || userInfo === null){
	            $rootScope.layout = constantService.getWebLayout();
	            $location.path('/');
	            return;
	        }
	        $rootScope.isWeb = false;
	        $rootScope.layout = constantService.getAppLayout();

	        $websocket.$new({
	        	url: configurationService.wsDashboard,
				lazy: false,
				reconnect: false,
				reconnectInterval: 2000,
				enqueue: false,
				mock: false
			});
	    });
    
	}]);
	
	app.config(['$routeProvider','routeResolverProvider','$controllerProvider', '$compileProvider', 
            '$filterProvider', '$provide', '$locationProvider', '$httpProvider', 'growlProvider',
         function ($routeProvider,routeResolverProvider, $controllerProvider, $compileProvider, 
        	$filterProvider, $provide, $locationProvider, $httpProvider, growlProvider) {
    		
    		growlProvider.globalTimeToLive(6000);
    		growlProvider.globalPosition('bottom-right');
    		growlProvider.globalReversedOrder(false);
    		growlProvider.onlyUniqueMessages(true);
    		growlProvider.globalDisableCountDown(true);
    		growlProvider.globalDisableIcons(false);
    		growlProvider.globalDisableCloseButton(false);
    		
    		app.register = {
    	        controller: $controllerProvider.register,
    	        //directive: $compileProvider.directive,
    	        filter: $filterProvider.register,
    	        //factory: $provide.factory,
    	        //service: $provide.service
    	    };
    		
    		// Provider-based service.
            app.service = function( name, constructor ) {
                $provide.service( name, constructor );
                return( this );
            };
            
            // Provider-based factory.
            app.factory = function( name, factory ) {
                $provide.factory( name, factory );
                return( this );
            };
            
            // Provider-based directive.
            app.directive = function( name, factory ) {
                $compileProvider.directive( name, factory );
                return( this );
            };

            var route = routeResolverProvider.route;
    		$routeProvider
    		//url, page and controller name prefix, dir path, title, isWeb
    		.when('/', 													route.resolve('signin', 						'app/security/', 						'Signin', 						true))
            .when('/home', 												route.resolve('home', 							'app/dashboard/', 						'Home', 						false))
            .when('/dashboard', 										route.resolve('dashboard', 						'app/dashboard/', 						'Dashboard', 					false))
            .otherwise({ redirectTo: '/dashboard' });
    		
          }]);

		return app;
	});
