
'use strict';

define(['app', 'services/utils/configurationService'], function (app) {

    var signInService = function ($resource, $q, configurationService) {
    	
    	var signInResource, delay;
        
        signInResource = $resource(configurationService.login, {}, {
        	postObject: { method: 'POST'}
        });
        
        this.postObject = function (obj) {
            delay = $q.defer();
            signInResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
			
        this.validateLoginForm = function (login) {
	 		var isValid = false;
	 		if(angular.isUndefinedOrNull(login) || angular.isUndefinedOrNull(login.loginID) 
	 			|| login.loginID.trim().length == 0){
	 			login.msg = 'Nl1001';
	 		} else if (angular.isUndefinedOrNull(login.password) || login.password.trim().length == 0){
	 			login.msg = 'Nl1002';
	 		} else {
	 			login.msg = 'Df1000';
	 			isValid = true;
	 		}
	 		return isValid;
	 	};
        

    };
    
    app.service('signInService', ['$resource', '$q', 'configurationService', signInService]);

});







