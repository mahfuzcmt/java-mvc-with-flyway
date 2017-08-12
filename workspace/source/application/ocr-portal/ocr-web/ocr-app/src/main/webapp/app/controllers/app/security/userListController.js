
'use strict';

define(['app'], function (app) {
    
	 var userListController = function ($rootScope, $scope, $modal, _, $filter, messageService, 
		 userService, constantService, navigationService, localStorageService, 
		 configurationService, ngProgress, loadService, authorizationService) {
	    	
	 var userInfo, promis;
    	
    	$scope.pageSize = 6;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        
        $scope.pageDataBegin = 0;
        $scope.pageDataEnd = 0;
        $scope.pageDataTotal = 0;
        $scope.pageItemText = "";
        
        $scope.users = [];
        $scope.filteredUsers = [];
        $scope.filteredTotalRecords = 0;
		
        $scope.goEditPage = function (user) {
        	navigationService.showPageWithData('user', user.loginID);
        };
        
        $scope.gotonewUser = function () {
	        navigationService.menuNavigation('user');
	    };
	     
        $scope.showPopupForUserReset = function (userObj) {
        	$modal.open({
        		templateUrl: 'app/partials/userPasswordResetModal.html',
                backdrop: true,
                keyboard: true,
                modalFade: true,                        
                windowClass: 'modal',
                controller: function ($scope, $modalInstance, $log) {
                    $scope.submit = function (user) {
                    	if(user == undefined || user.newPassword == undefined || user.newPassword.trim().length == 0){
                    		user.msg = 'Vd1009';
                    		return;
                    	} else if(user.confirmPassword == undefined || user.confirmPassword.trim().length == 0){
                    		user.msg = 'Vd1010';
                    		return;
                    	} else if(user.confirmPassword.trim() != user.newPassword.trim()){
                    		user.msg = 'Pw1001';
                    		return;
                    	}
                    	var requestUser = {};
                    	requestUser.newPassword = user.newPassword;
                    	requestUser.confirmPassword = user.confirmPassword;
                    	requestUser.loginID = userObj.loginID;
                    	resetUser($modalInstance, requestUser);                     
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        };

        var resetUser = function ($modalInstance, user) {
            loadService.showDialog();
		    userInfo = authorizationService.getUserInfo();
		    user.loginBean = userInfo;
			user.operation = constantService.ResetPassword;
	    	promis = userService.postObject(user);
			promis.then(function (data) {
				loadService.hideDialog();
	            $modalInstance.dismiss('cancel'); 
	    		if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				messageService.showMessage(constantService.Success, data.code);
			});
        };
        
    	
    	var filterUsers = function (filterText) {
        	$scope.filteredUsers = $filter("userFilter")($scope.users, filterText);
        	$scope.filteredTotalRecords =  Math.ceil($scope.filteredUsers.length);
        	
        	$scope.pageDataTotal = $scope.filteredTotalRecords;
        	if($scope.pageDataTotal == 0){
        		$scope.pageDataBegin = 0;
            	$scope.pageDataEnd = 0;        		    		
    		} else {
        		$scope.pageDataBegin = (($scope.currentPage - 1) * $scope.pageSize) + 1;
            	$scope.pageDataEnd = $scope.pageDataBegin + $scope.pageSize - 1;    		
    		}
        	
        	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
        		$scope.pageDataEnd = $scope.pageDataTotal
        	}  
        	       	
    		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
					$scope.pageDataTotal, "Users", 'English');
        };

        $scope.numPages = function () {
        	return Math.ceil($scope.users.length / $scope.pageSize);
        };
    	
    	var createWatches = function () {
        	$scope.$watch("searchText", function (filterText) {
        		filterUsers(filterText);
            	$scope.currentPage = 1;
            });
            
            $scope.$watch('currentPage + pageSize', function() {
            	var begin = (($scope.currentPage - 1) * $scope.pageSize), end = begin + ($scope.pageSize - 0);
            	$scope.filteredUsers = $scope.users.slice(begin, end);
            	$scope.pageDataTotal = $scope.filteredTotalRecords;
            	if($scope.pageDataTotal == 0) {
            		$scope.pageDataBegin = 0;
                	$scope.pageDataEnd = 0;        		    		
        		} else {
            		$scope.pageDataBegin = begin + 1;
                	$scope.pageDataEnd = end;
        		}
            	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
            		$scope.pageDataEnd = $scope.pageDataTotal
            	}
        		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, "User", "English");
            });
        };
    	
		var getAllUsers = function () {			
			loadService.showDialog();
			var userObj = { operation : constantService.GetAllUsers };
        	promis = userService.postObject(userObj);
            promis.then(function (data) {
            	loadService.hideDialog();
    			if (!data.success) {
            		messageService.showMessage(constantService.Danger, data.code);
                    return;
                }
            	$scope.users = data.data;
            	filterUsers('');
        		createWatches();
            });
        };
        
	 	var init = function () {
			 ngProgress.start();
			 getAllUsers();
		     ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('userListController', ['$rootScope', '$scope', '$modal', '_', '$filter', 'messageService', 'userService', 
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 'loadService', 'authorizationService',
    userListController]);
   
	
});

