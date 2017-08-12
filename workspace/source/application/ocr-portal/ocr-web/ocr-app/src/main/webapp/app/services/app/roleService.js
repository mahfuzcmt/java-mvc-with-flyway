
'use strict';

define(['app'], function (app) {

	var roleService = function ($rootScope, $resource, $q, constantService, configurationService, messageService) {
		
		var roleResource, delay;
	    
		roleResource = $resource(configurationService.role, {}, {
			postObject: { method: 'POST' }
		});
		
        
        this.postObject = function (obj) {
            delay = $q.defer();
            roleResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        
        this.validateForm = function(obj) {
			if(obj == undefined || obj.roleID == undefined || obj.roleID.trim().length == 0){
				growl.warning("Please Enter role ID!", {ttl: 3000});
				$('#roleID').focus();
				return false;
			}
			if(obj.status == undefined || obj.status.trim().length == 0){
				growl.warning("Please select status!", {ttl: 3000});
				$('#status').focus();
				return false;
			}
			return true;
        };
        
	
    };
    
    app.service('roleService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService', 
    'messageService', roleService]);

});

