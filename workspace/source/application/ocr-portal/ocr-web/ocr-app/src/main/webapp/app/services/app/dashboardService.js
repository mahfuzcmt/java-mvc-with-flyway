
'use strict';

define(['app'], function (app) {

	var dashboardService = function ($rootScope, $resource, $q, constantService, configurationService) {
		
		var dashboardResource,groupDashboardResource, delay;
	    
		dashboardResource = $resource(configurationService.dashboard, {}, {
			postObject: { method: 'POST' }
		});
		
		groupDashboardResource = $resource(configurationService.dashboardbygroup, {}, {
			getGroupDashboardData: { method: 'POST' }
		});
		
        
        this.postObject = function (obj) {
            delay = $q.defer();
            dashboardResource.postObject(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.getGroupDashboardData = function (obj) {
            delay = $q.defer();
            groupDashboardResource.getGroupDashboardData(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
		
	
    };
    
    app.service('dashboardService', ['$rootScope', '$resource', '$q', 'constantService', 
           'configurationService', dashboardService]);

});

