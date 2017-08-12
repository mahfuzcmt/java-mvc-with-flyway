'use strict';

define(['app'], function(app) {

	var userPasswordResetController = function($scope, constantService, ngProgress, loadService, authorizationService, growl, 
		modalService, configurationService, userService, data, $modalInstance) {
		 
		var userInfo, promis;

		$scope.cancel = function () {
	    	$modalInstance.dismiss('cancel');
		};
		
        $scope.submit = function(model) {
        	var user = angular.copy(model);
        	if(!userService.validateResetPassword(user)) {
				 return;
        	}
        	user.loginBean = userInfo;
        	user.loginID = data.loginID;
			$scope.responseMsg = "Successfully reset password ";
        	user.operation =  constantService.ResetPassword;
			var modalOptions = {
				closeButtonText: 'No',
				actionButtonText: 'Yes',
				headerText: ' Confirmation',
				bodyText: ' Are you sure to proceed with reset password?'
			};
			var modalDefaults = {
				templateUrl: 'app/partials/confirmation.html'
			};	
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				if(result == 'cancel'){
					return;
				}
				ngProgress.start();
				loadService.showDialog();
				promis = userService.postObject(user);
				promis.then(function (responseData) {
					ngProgress.complete();
					loadService.hideDialog();
					if (!responseData.success) {
						growl.error("Unable to reset passsword ", {ttl: 3000});
						return;
					}
					growl.success($scope.responseMsg, {ttl: 3000});
					$modalInstance.close('close');
				});
			});
        };
        
		var init = function () {
			userInfo = authorizationService.getUserInfo();
		};

        init();
	 	
	};

	app.controller('userPasswordResetController', ['$scope', 'constantService', 'ngProgress', 'loadService', 'authorizationService', 
    	'growl', 'modalService', 'configurationService', 'userService', 'data', '$modalInstance', userPasswordResetController ]);
});