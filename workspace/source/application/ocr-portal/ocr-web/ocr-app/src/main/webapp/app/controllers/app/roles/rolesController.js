
'use strict';

define(['app'], function (app) {
    
	 var rolesController = function ($rootScope, $scope, $modal, _, $filter, messageService,
			 constantService, navigationService, localStorageService, modalService,
		 configurationService, ngProgress, loadService, authorizationService, filterService, growl, roleService, contactsService) {

			var userInfo, promis;
			
			$scope.getRoleList = function(){
				loadService.showDialog();
				var obj = {
					operation 	: constantService.GetAll
				};
				promis = roleService.postObject(obj);
				promis.then(function(data) {
					loadService.hideDialog();
					if (!data.success) {
						return;
					}
					$scope.dataList = data.data;
				});
			};
			
			$scope.goToEntryPage = function(){
				navigationService.menuNavigation('userandroles')
			}
			
			var init = function() {
				$scope.getRoleList();
			};

			init();
		 
	 };
	 
	 app.register.controller('rolesController', ['$rootScope', '$scope', '$modal', '_', '$filter', 'messageService', 
		 'constantService', 'navigationService', 'localStorageService', 'modalService', 'configurationService', 
     'ngProgress', 'loadService', 'authorizationService', 'filterService', 'growl', 'roleService', 'contactsService', rolesController]);
	
});

