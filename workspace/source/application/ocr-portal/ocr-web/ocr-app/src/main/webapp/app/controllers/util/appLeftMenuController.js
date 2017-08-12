
'use strict';

define(['app'], function (app) {
    
	 var appLeftMenuController = function ($rootScope, $scope, navigationService, configurationService, 
		localStorageService, constantService, authorizationService) {
		
		 var clearMenu = function(){
				angular.forEach($scope.menu, function(value, key) {
					if(value.children.length > 0){
						angular.forEach(value.children, function(childValue, key) {
							childValue.active = false;
						});
					} else {
						value.active = false;
					}
				});
			};
			
			var selectChildMenu = function(url){
				angular.forEach($scope.menu, function(value, key) {
					if(value.children.length > 0){
						angular.forEach(value.children, function(childValue, key) {
							if(childValue.url == url){
								childValue.active = true;
							}
						});
					} else {
						if(value.url == url){
							value.active = true;
						}
					}
				});
			};
			
			var selectTopMenu = function(url){
				angular.forEach($scope.menu, function(value, key) {
					if(value.children.length == 0 && value.url == url){
						value.active = true;
					}
				});
			};
			
			$scope.clickChildItem = function(array, item, index){
	        	clearMenu();
	        	selectChildMenu(item.url);
	        	authorizationService.setSelectedMenu(item.url);
				navigationService.menuNavigation(item.url);
			};
			
			$scope.clickTopItem = function(item){
				var isActive = $("#"+item.id).hasClass('active');
				if(item.children.length > 0) {
					$("#"+item.id).removeClass('active');
		            $("#"+item.id).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
		            $("#"+item.id).children('ul.treeview-menu').slideUp("slow","swing");
					if (isActive) {
						$("#"+item.id).removeClass('active');
			            $("#"+item.id).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
			            $("#"+item.id).children('ul.treeview-menu').slideUp("slow","swing");
					} else {
						$("#"+item.id).addClass('active');
			            $("#"+item.id).children('a').children("i.fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
			            $("#"+item.id).children('ul.treeview-menu').slideDown("slow","swing");
					}
				} else {
		        	clearMenu();
		        	selectTopMenu(item.url);
					navigationService.menuNavigation(item.url);
				}
			};
			
		var init = function () {
        	$scope.userInfo = authorizationService.getUserInfo();
        	$scope.menu = authorizationService.getMenu();
        	var selectedMenu = authorizationService.getMenu();
        	clearMenu();
        	selectChildMenu(selectedMenu);
        	selectTopMenu(selectedMenu)
	    }; 
	    
	    
	    init();
		 
	 };    
	 
	 app.controller('appLeftMenuController', ['$rootScope', '$scope', 'navigationService', 'configurationService', 
     'localStorageService','constantService', 'authorizationService', appLeftMenuController]);
	
});

