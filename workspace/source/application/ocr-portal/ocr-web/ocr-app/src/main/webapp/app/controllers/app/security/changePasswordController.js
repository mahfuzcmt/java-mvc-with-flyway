
'use strict';

define(['app'], function (app) {
	
	var changePasswordController = function ($rootScope, $scope, _, messageService,
		userService, signInService, constantService, authorizationService, localStorageService,
		configurationService, ngProgress, loadService, $upload, confirmationService, growl) {
		
		var promis, userInfo;
		var userObj = { oldPassword : '', newPassword : '', confirmPassword : '' };
		
		$scope.changePassword = function (user) {
			if(!userService.validateChangePasswordForm(user)){
				return;
			}
			var confirmOptions = {
					closeButtonText: 'No',
					actionButtonText: 'Yes',
	 	            headerText: 'Please Confirm',
	 	            bodyText: 'Are you sure to change your password?'
			};
			confirmationService.showModal({}, confirmOptions).then(function (result) {
				if(result == 'ok'){
				 loadService.showDialog();
				  userInfo = authorizationService.getUserInfo();
				    var obj = {
						    		loginID 		: userInfo.loginID,
								    newPassword 	: user.newPassword,
								    oldPassword 	: user.oldPassword,
								    operation	 	: constantService.ChangePassword,
				    };
			    	promis = signInService.postObject(obj);
					promis.then(function (data) {
						loadService.hideDialog();
			    		if (data.code == 'INVP003') {
			    			growl.error("Sorry,  Invalid old password!", {ttl: 3000});
							return;
						}
			    		if (data.code == 'UCP002') {
			    			growl.error("Sorry, Something went wrong!", {ttl: 3000});
							return;
						}
			    		if (data.code == 'SCP001') {
			    			growl.success("Successfully changed password", {ttl: 3000});
			    			$scope.resetChangePassword();
							return;
						}
					});
				}
			});
		};
		 
		$scope.resetChangePassword = function () {
			$scope.user = angular.copy(userObj);
		};
		 
	 	var init = function () {
			 ngProgress.start();
		     ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('changePasswordController', ['$rootScope', '$scope', '_', 'messageService', 'userService', 'signInService',
    'constantService', 'authorizationService', 'localStorageService', 'configurationService', 'ngProgress', 'loadService', '$upload',
    'confirmationService', 'growl', changePasswordController]);
   
	
});

