'use strict';

define([ 'app' ], function(app) {
	
	var usersEmployeeController = function ($rootScope, $scope, $log) {
		
		var init = function () {
			$scope.gridLocation = 'app/views/util/grid.html';
	 		$scope.param = {
	 			tableName : 'Login',
	 			tableMessage : 'Logins',
	 			gridHeader : 'All user Logins'
	 		};
	 	};

	 	init();
	 	
	 };

	 app.register.controller('usersEmployeeController', ['$rootScope', '$scope', '$log', usersEmployeeController ]);

});
