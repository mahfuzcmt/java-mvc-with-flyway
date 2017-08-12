
'use strict';

define(['app'], function (app) {
    
	 var userController = function ($rootScope, $scope, _, messageService, 
		 userService, roleService, constantService, navigationService, localStorageService, 
		 configurationService,  ngProgress, loadService, $upload, $http, authorizationService,
		 modalService, $routeParams) {
		 
		 var userInfo, promis;
    	 var userObj = { loginID : '', password : '', confirmPassword : '', name : '', roleID : '', status : 'A', imagePath : '' };
		
		 $scope.upload = function (files) {
    		if (files && files.length) {
    			for (var i = 0; i < files.length; i++) {
    				var file = files[i];
    				if(file.size /(1024*1024)>1){
						growl.error("Image size should not be more than 1 Megabyte", { ttl: 3000 });
						return;
					}
                    $upload.upload({
                    	url : configurationService.fileupload+"?folderName=user",
                        fields: {
                            'userName': 'Test'
                        },
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('Progress: ' + progressPercentage + '% ' + evt.config.file.name);                    	
                    }).success(function (data, status, headers, config) {
                        if($scope.user != undefined){
                        	$scope.user.imagePath = data.data;
                        }
                    }).error(function (data, status, headers, config) {
                        if($scope.user != undefined){
                        	$scope.user.imagePath = '';
                        }
			        });
                }
    		}
    	};
		
    	$scope.resetUser = function() {
    		$scope.user = angular.copy(userObj);
    		$scope.user.operation = constantService.Save;
			$("#profilePic").attr('src', '');
			$scope.btnSave = "Add User";
	    	$scope.isNewUser = true;
    	};
		
    	$scope.saveUser = function(user) {
    		if(!userService.validateNewUserForm(user)) {
				return;
			}
			userInfo = authorizationService.getUserInfo();
			user.loginBean = userInfo;
    		var modalOptions = {
				closeButtonText: 'No',
      	        actionButtonText: 'Yes',
      	        headerText: ' Confirmation',
      	        bodyText: ' Are you sure to proceed with user information?'
    		};
			var modalDefaults = {
    			templateUrl: 'app/partials/confirmation.html'
    	    };	
			
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				if(result == 'cancel'){
					return;
				}
				
				loadService.showDialog();
				promis = userService.postObject(user);
				promis.then(function (data) {
					loadService.hideDialog();
	    			if (!data.success) {
						messageService.showMessage(constantService.Danger, data.code);
						return;
					}
	    			$scope.resetUser();
					messageService.showMessage(constantService.Success, data.code);
				});

         	});
    		
    	};
	    	
    	var loadStatus = function () {
        	$http.get('config/rolestatus.json').success(function(data) {
				$scope.statusList = data;
		    });
        };
	    	
		var getAllRole = function () {			
			loadService.showDialog();
			var roleObj = { operation : constantService.GetAllRole };
        	promis = roleService.postObject(roleObj);
            promis.then(function (data) {
            	loadService.hideDialog();
    			if (!data.success) {
            		messageService.showMessage(constantService.Danger, data.code);
                    return;
                }
            	$scope.roles = data.data;
            	loadStatus();
            });
        };
	    	
    	var loadUser = function (loginID) {
    		var user = {};
    		user.operation = constantService.GetUserByLoginID;
    		user.loginID = loginID;
    		userInfo = authorizationService.getUserInfo();
			user.loginBean = userInfo;
			loadService.showDialog();
			promis = userService.postObject(user);
			promis.then(function (data) {
				loadService.hideDialog();
    			if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				$scope.user = data.data;
	    		$scope.user.operation = constantService.Update;
				getAllRole();	
			});
    	};	    	
	    	
	 	var init = function () {
			 ngProgress.start();
			 $scope.resetUser();
			 if($routeParams.loginID != undefined && $routeParams.loginID != null && $routeParams.loginID.trim().length != 0){
		    	 $scope.btnSave = "Update User";
		    	 $scope.isNewUser = false;
		    	 loadUser($routeParams.loginID);
			 } else {
				 getAllRole();	
			 }
		     ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('userController', ['$rootScope', '$scope', '_', 'messageService', 'userService', 'roleService',
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 'loadService', '$upload', 
    '$http', 'authorizationService', 'modalService', '$routeParams', userController]);
   
	
});

