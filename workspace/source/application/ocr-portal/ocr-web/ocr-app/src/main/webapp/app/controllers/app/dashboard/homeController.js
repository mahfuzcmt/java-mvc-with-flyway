'use strict';

define(['app'], function (app) {
	
	var homeController = function ($rootScope, $scope, $websocket, configurationService, $log) {
			    
	    var ws = $websocket.$get(configurationService.wsDashboard);
		ws.$open();
		 
		$scope.$on('$destroy', function () {
			ws.$close();
		});
		
		ws.$on('$close', function(data) {
			$log.debug('ws closed');
		});
		
		ws.$on('$open', function() {
			$log.debug('connected');
		});
		
		ws.$on('$error', function (response) {
			$log.debug('disconnected');
 		});
		
		ws.$on('$message', function (res) {
			if(res == "connected" || res == "disconnected" || res == "close"){
				return;
			}
			$log.debug(res);
		}); 
		
	};
	 
    app.register.controller('homeController', ['$rootScope', '$scope', '$websocket',
    	'configurationService', '$log', homeController]);

});

