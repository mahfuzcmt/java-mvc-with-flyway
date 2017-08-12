'use strict';

define(['app'], function (app) {
	
	var dashboardController = function ($rootScope, $scope, _, messageService, dashboardService, constantService, 
		navigationService, localStorageService,authorizationService, configurationService,  ngProgress, loadService, growl) {
		
		var promis;
		
	 	var init = function () {
	 		
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('dashboardController', ['$rootScope', '$scope', '_', 'messageService', 'dashboardService', 
    'constantService', 'navigationService', 'localStorageService','authorizationService','configurationService', 
    'ngProgress', 'loadService', 'growl', dashboardController]);
	
});


