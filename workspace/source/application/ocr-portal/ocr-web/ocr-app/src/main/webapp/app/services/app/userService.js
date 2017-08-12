
'use strict';

define(['app'], function (app) {

	var userService = function ($rootScope, $resource, $q, constantService, configurationService, growl) {
		
		var userResource, delay;
	    
		userResource = $resource(configurationService.user, {}, {
			postObject: { method: 'POST' }
		});
		
        
        this.postObject = function (obj) {
            delay = $q.defer();
            userResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.validateChangePasswordForm = function(obj) {
			if(obj == undefined || obj.oldPassword == undefined || obj.oldPassword.trim().length == 0){
				growl.warning("Please Enter old password!", {ttl: 3000});
				$('#oldPassword').focus();
				return false;
			}
			if(obj.newPassword == undefined || obj.newPassword.trim().length == 0){
				growl.warning("Please Enter new password!", {ttl: 3000});
				$('#newPassword').focus();
				return false;
			}
			if(obj.confirmPassword == undefined || obj.confirmPassword.trim().length == 0){
				growl.warning("Please enter confirm password!", {ttl: 3000});
				$('#confirmPassword').focus();
				return false;
			}
			if(obj.newPassword.trim() != obj.confirmPassword.trim()){
				growl.warning("New password and confirm password does not match!", {ttl: 3000});
				$('#confirmPassword').focus();
				return false;
			}
			if(obj.newPassword.trim().length < 6 ||  obj.newPassword.trim().length > 16){
				growl.warning("Password must be minimum 6 digit and maximum 16 digit!", {ttl: 6000});
				$('#newPassword').focus();
				return false;
			}
			return true;
        };
        
        this.validateResetPassword = function(obj) {
			if(obj == undefined || obj.newPassword == undefined || obj.newPassword.trim().length == 0){
				growl.warning("Please Enter new password!", {ttl: 3000});
				$('#newPassword').focus();
				return false;
			}
			if(obj.confirmPassword == undefined || obj.confirmPassword.trim().length == 0){
				growl.warning("Please enter confirm password!", {ttl: 3000});
				$('#confirmPassword').focus();
				return false;
			}
			if(obj.newPassword.trim() != obj.confirmPassword.trim()){
				growl.warning("New password and confirm password does not match!", {ttl: 3000});
				$('#confirmPassword').focus();
				return false;
			}
			if(obj.newPassword.trim().length < 6 ||  obj.newPassword.trim().length > 16){
				growl.warning("Password must be minimum 6 digit and maximum 16 digit!", {ttl: 6000});
				$('#newPassword').focus();
				return false;
			}
			return true;
        };
        
        this.validateTopSettings = function(obj) {
			if(angular.isUndefinedOrNull(obj) || angular.isUndefinedOrNull(obj.groupOfCompanyName) || obj.groupOfCompanyName.trim().length == 0){
				growl.warning("Please Enter Group Of Company Name", {ttl: 3000});
				$('#groupOfCompanyName').focus();
				return false;
			}
			if(angular.isUndefinedOrNull(obj.loginID) || obj.loginID.trim().length == 0){
				growl.warning("Please Enter Login ID", {ttl: 3000});
				$('#loginID').focus();
				return false;
			}
			if(angular.isUndefinedOrNull(obj.password) || obj.password.trim().length == 0){
				growl.warning("Please Enter Password", {ttl: 3000});
				$('#password').focus();
				return false;
			}
			if(angular.isUndefinedOrNull(obj.userName) || obj.userName.trim().length == 0){
				growl.warning("Please Enter User Name", {ttl: 3000});
				$('#userName').focus();
				return false;
			}
			if(angular.isUndefinedOrNull(obj.gcLogoPath) || obj.gcLogoPath.trim().length == 0){
				growl.warning("Please Upload Group of Company Logo", {ttl: 3000});
				$('#gcLogoPath').focus();
				return false;
			}
			return true;
        };
        
        this.validateNewUserForm = function(obj) {
			if(angular.isUndefinedOrNull(obj) || angular.isUndefinedOrNull(obj.loginID) || obj.loginID.trim().length == 0){
				//messageService.showMessage(constantService.Danger, 'Vd1007');
				$('#loginID').focus();
				return false;
			}
			if(obj.operation == constantService.Save){
				if(obj.password == undefined || obj.password.trim().length == 0){
					//messageService.showMessage(constantService.Danger, 'Vd1009');
					$('#password').focus();
					return false;
				}
				if(obj.confirmPassword == undefined || obj.confirmPassword.trim().length == 0){
					//messageService.showMessage(constantService.Danger, 'Vd1010');
					$('#confirmPassword').focus();
					return false;
				}
				if(obj.password.trim() != obj.confirmPassword.trim()){
					//messageService.showMessage(constantService.Danger, 'Pw1001');
					$('#confirmPassword').focus();
					return false;
				}				
			}
			if(obj.name == undefined || obj.name.trim().length == 0){
				//messageService.showMessage(constantService.Danger, 'Vd1006');
				$('#name').focus();
				return false;
			}
			if(obj.roleID == undefined || obj.roleID.trim().length == 0){
				//messageService.showMessage(constantService.Danger, 'Vd1011');
				return false;
			}
			if(obj.status == undefined || obj.status.trim().length == 0){
				//messageService.showMessage(constantService.Danger, 'Vd1012');
				return false;
			}
			
			return true;
        };
		
	
    };
    
    app.service('userService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService', 
    'growl', userService]);

});

