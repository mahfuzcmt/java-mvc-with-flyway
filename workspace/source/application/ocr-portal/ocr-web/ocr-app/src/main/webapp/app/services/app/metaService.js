
'use strict';

define(['app'], function (app) {

	var metaService = function ($rootScope, $resource, $q, constantService, configurationService, messageService) {
		
		var metaResource, delay;
	    
		metaResource = $resource(configurationService.meta, {}, {
			postObject: { method: 'POST' }
		});
        
        this.postObject = function (obj) {
            delay = $q.defer();
            metaResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
	
    };
    
    app.service('metaService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService', 
    'messageService', metaService]);

});

