'use strict';

define(['app'], function (app) {
	
	var appHeaderController = function ($rootScope, $filter, $scope, $window, authorizationService, 
		navigationService, localStorageService, constantService, modalService, signInService, 
		loadService, growl,  $log, $websocket, configurationService) {
		
		var userInfo, promis;
		$scope.showAddCompanyButton = true;
	 	$scope.companyList = [];
	 	$scope.notificationList = [];
		 
        $scope.menuToggle = function () {
        	if ($window.innerWidth <= 992) {
                $('.row-offcanvas').toggleClass('active', 500);
                $('.left-side').removeClass("collapse-left");
                $(".right-side").removeClass("strech");
                $('.row-offcanvas').toggleClass("relative", 500);
            } else {
                $(".right-side").toggleClass("strech", 500);
                $('.left-side').toggleClass("collapse-left", 500);
            }
        };
       
		$scope.logout = function () {		
        	userInfo = authorizationService.getUserInfo();
        	userInfo.operation = constantService.Logout;
            promis = signInService.postObject(userInfo);
            promis.then(function (data) {
            	authorizationService.signOut();
            	$log.debug('User signed out.');
            });
        };
        
       $scope.redirectTo = function(url){
    	   $scope.searchingText = "";
    	   navigationService.menuNavigation(url);
       };
       
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
			var obj = { msg : "A purchase requisition is awaiting for checking"};
			$scope.notificationList.push();
		}); 
		
		var obj = { msg : "A purchase requisition is awaiting for checking"};
		$scope.notificationList.push(obj);
		var obj = { msg : "A purchase order is awaiting for authorizing"};
		$scope.notificationList.push(obj);
		
       var init = function () {
    	   userInfo = authorizationService.getUserInfo();
    	   $scope.userInfo = angular.copy(userInfo);
	    }; 
	    init();
	};
    
	app.controller('appHeaderController', ['$rootScope', '$filter', '$scope', '$window', 
		'authorizationService', 'navigationService', 'localStorageService', 'constantService', 
		'modalService', 'signInService', 'loadService', 'growl',
		'$log', '$websocket', 'configurationService', appHeaderController]);
	
});

