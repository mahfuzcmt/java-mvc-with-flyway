
'use strict';

define(['app'], function (app) {
	
	var topSettingsListController = function ($rootScope, $scope, userService, $modal, _, constantService, 
		navigationService, modalService, configurationService, ngProgress, loadService, 
		authorizationService, filterService, growl, gridService, $log, confirmationService) {
		 
		var userInfo, promis;
		
        $scope.numPages = function () {
        	return Math.ceil($scope.dataList.length/$scope.pageSize);
        };
    	
        $scope.showEntryPage = function () {	
        	navigationService.menuNavigation('topsettings/new');
        };
	     
		$scope.gotoEditPage = function(loginID){
			navigationService.showPageWithData('topsettings/edit', loginID);
		};
		 
		$scope.resetPassword = function(loginID) {
            var modalDefaults = {
				animation: true,
                templateUrl: 'app/partials/userPasswordResetModal.html',
		        controller : 'userPasswordResetController',
		       // size : 'lg',
		        resolve: {
		        	data : function () {
		              return { 'loginID' : loginID };
		            }
		        },
		        scope: $rootScope.$new()
            };
            var modalOptions = { };
            modalService.showModal(modalDefaults, modalOptions);
		};
		 
		$scope.convertUserStatus = function(user, orderAs) {
			var obj = {};
			obj.loginID = user.loginID;
			obj.status = orderAs;
			obj.loginBean = userInfo;
			obj.operation = constantService.UpdateStatus;
			$scope.responseMsg = "Successfully convert to "+orderAs;
            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: ' Confirmation',
                bodyText: 'Are you sure you want to change '+ user.userName+' status to '+ user.status+'?'
            };
            var modalDefaults = {
                templateUrl: 'app/partials/confirmation.html'
            };
            modalService.showModal(modalDefaults, modalOptions).then(function(result) {
                if (result == 'cancel') {
                    return;
                }
				ngProgress.start();
				loadService.showDialog();
				promis = userService.postObject(obj);
				promis.then(function (responseData) {
				ngProgress.complete();
					loadService.hideDialog();
					if (!responseData.success) {
						return;
					}
					growl.success($scope.responseMsg, {ttl: 3000});
					loadAllUserData();
				});
			});
		};
        
 	    var loadAllUserData = function() {
 	    	var obj = { operation : constantService.GetAllData, loginBean : userInfo };
 	    	promis = userService.postObject(obj);
 	    	promis.then(function (responseData) {
 	    		if (!responseData.success) {
 	    			growl.error("Unable to load user data!", {ttl: 3000});
                     return;
 	    		}
      			$scope.userList = responseData.data;
 	    	});
 	    };
       
	 	var init = function () {
	 		userInfo = authorizationService.getUserInfo();
	 		loadAllUserData();
	 	};

	 	init();
		
	};

    app.register.controller('topSettingsListController', ['$rootScope', '$scope', 'userService', '$modal', '_', 'constantService', 
    'navigationService', 'modalService', 'configurationService', 'ngProgress', 'loadService', 
    'authorizationService', 'filterService', 'growl', 'gridService', '$log', 'confirmationService', 
    topSettingsListController]);
	
});

