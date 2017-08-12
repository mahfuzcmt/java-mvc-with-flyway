
'use strict';

define(['app'], function (app) {
	
	var emailController = function ($rootScope, $scope, $modal, _, constantService, 
		navigationService, modalService, configurationService, ngProgress, loadService, 
		authorizationService, filterService, growl, gridService, $log, confirmationService, emailService) {
		 
		var userInfo, promis;
		$scope.email = {};
		
		$scope.sendEmail = function(emailobj) {
			$scope.email = {};
			$scope.email = angular.copy(emailobj);
			$scope.email.loginBean = userInfo;
			
			if($scope.email.emailtos != undefined && $scope.email.emailtos != ""){
				$scope.email.emailtos = $scope.email.emailtos.split(',');
			}
			if($scope.email.emailccs != undefined && $scope.email.emailccs != ""){
				$scope.email.emailccs = $scope.email.emailccs.split(',');
			}
			if($scope.email.emailbccs != undefined && $scope.email.emailbccs != ""){
				$scope.email.emailbccs = $scope.email.emailbccs.split(',');
			}
			
			
			//emailobj.operation = data.operation;
			
			 var modalOptions = {
				 closeButtonText: 'No',
				 actionButtonText: 'Yes',
				 headerText: ' Confirmation',
				 bodyText: ' Are you sure to send the email?'
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
				 promis = emailService.postObject($scope.email);
				 promis.then(function (responseData) {
	        		 ngProgress.complete();
					 loadService.hideDialog();
					 if (!responseData.success) {
						 growl.error("Unable to send mail", {ttl: 3000});
						 return;
					 }
					 growl.success("Mail Sent", {ttl: 3000});
					 $scope.email = {};
				 });
			 });
		 };
		
	 	var init = function () {
	 		userInfo = authorizationService.getUserInfo();
	 		$scope.heading = 'Email Panel';
	 	};

	 	init();
		
	};

    app.register.controller('emailController', ['$rootScope', '$scope', '$modal', '_', 'constantService', 
    'navigationService', 'modalService', 'configurationService', 'ngProgress', 'loadService', 
    'authorizationService', 'filterService', 'growl', 'gridService', '$log', 'confirmationService', 'emailService', 
    emailController]);
	
});


