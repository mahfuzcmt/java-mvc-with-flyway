'use strict';

define(['app'], function (app) {
	
	var roleController = function (growl, $rootScope, $scope, _, messageService, roleService, constantService, 
			ngProgress, loadService, $http, authorizationService, modalService, metaService) {
		
		var userInfo, promis, metaJson;
		var roleObj = { status : 'Active' };
		$scope.btnSave = 'Save';
    	var categories = [
    		 { key: "GC", value: "Group of Company"},
    		 { key: "C", 	value: "Company"}
    	];
		
    	$scope.cancel = function() {
    	
    	};
    	
    	$scope.saveRole = function(role) {
    		if(!roleService.validateForm(role)) {
				return;
			}
			userInfo = authorizationService.getUserInfo();
			role.loginBean = userInfo;
			role.operation = constantService.Save;
			role.menuJSON = $scope.newJson;
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
				promis = roleService.postObject(role);
				promis.then(function (data) {
					loadService.hideDialog();
	    			if (!data.success) {
	    				growl.error($scope.errorMsg, {ttl: 3000});
						return;
					}
	    			growl.success($scope.successMsg, {ttl: 3000});
				});
         	});
    	};
        
        var selectOrUnselectModule = function(selectedObj){
        	angular.forEach($scope.masterjson.children[0].children, function(moduleLevel) {
        		var countDisabledMenu = 0;
        		angular.forEach(moduleLevel.children, function(menuObj) {
        			if(menuObj.id === selectedObj.id){
        				if(menuObj.enable){
        					moduleLevel.enable = true;
    						return;
    					}
    				}
    				if(!menuObj.enable){
    					countDisabledMenu += 1;
					}
    			});
    			if(countDisabledMenu === moduleLevel.children.length && moduleLevel.children.length > 0){
    				moduleLevel.enable = false;
				}
    		});
    	};
    	
    	var setAccessPermission = function(selectedObj, taskPermission){
    		if(taskPermission === 'isfullaccess'){
    			if(selectedObj.isfullaccess){
    				selectedObj.isview = true;
    				selectedObj.iscreate = true;
    				selectedObj.isedit = true;
    				selectedObj.isdelete = true;
    				selectedObj.enable = true;
    			} else{
    				selectedObj.isview = false;
    				selectedObj.iscreate = false;
    				selectedObj.isedit = false;
    				selectedObj.isdelete = false;
    				selectedObj.isfullaccess = false;
    				selectedObj.enable = false;
    			}
			} else if(taskPermission === 'isview'){
				if(selectedObj.isview){
					selectedObj.isview = true;
    				selectedObj.isfullaccess = true;
    				selectedObj.enable = true;
    			} else{
    				selectedObj.isview = false;
    				selectedObj.iscreate = false;
    				selectedObj.isedit = false;
    				selectedObj.isdelete = false;
    				selectedObj.isfullaccess = false;
    				selectedObj.enable = false;
    			}
			} else if(taskPermission === 'iscreate'){
				if(selectedObj.iscreate){
					selectedObj.isview = true;
    				selectedObj.iscreate = true;
    				selectedObj.isfullaccess = true;
    				selectedObj.enable = true;
    			} else{
    				selectedObj.iscreate = false;
    				selectedObj.isedit = false;
    				selectedObj.isdelete = false;
    				selectedObj.isfullaccess = false;
    			}
			} else if(taskPermission === 'isedit'){
				if(selectedObj.isedit){
					selectedObj.isview = true;
					selectedObj.iscreate = true;
    				selectedObj.isedit = true;
    				selectedObj.isfullaccess = true;
    				selectedObj.enable = true;
    			} else{
    				selectedObj.isedit = false;
    				selectedObj.isdelete = false;
    				selectedObj.isfullaccess = false;
    			}
			} else if(taskPermission === 'isdelete'){
				if(selectedObj.isdelete){
					selectedObj.isview = true;
					selectedObj.iscreate = true;
					selectedObj.isedit = true;
    				selectedObj.isdelete = true;
    				selectedObj.isfullaccess = true;
    				selectedObj.enable = true;
    			} else{
    				selectedObj.isdelete = false;
    				selectedObj.isfullaccess = false;
    			}
			}
    		if(selectedObj.isdelete && selectedObj.isedit && selectedObj.iscreate && selectedObj.isview){
    			selectedObj.isfullaccess = true;
			}
    		if(!selectedObj.isdelete || !selectedObj.isedit || !selectedObj.iscreate || !selectedObj.isview){
    			selectedObj.isfullaccess = false;
			}
    	};
    	 
    	$scope.generateJson = function(selectedObj, taskPermission){
    		if(!angular.isUndefined(taskPermission)){
    			setAccessPermission(selectedObj, taskPermission);
    		} else {
				angular.forEach($scope.masterjson.children[0].children, function(moduleLevel) {
					if(moduleLevel.id === selectedObj.id){
						if(moduleLevel.enable){
							angular.forEach(moduleLevel.children, function(menuObj) {
								menuObj.enable = true;
		 						menuObj.isfullaccess = true;
		 						setAccessPermission(menuObj, 'isfullaccess');
		 					});
		 				} else if(!moduleLevel.enable){
		 					angular.forEach(moduleLevel.children, function(menuObj) {
		 						menuObj.enable = false;
		 						menuObj.isfullaccess = false;
		 						setAccessPermission(menuObj, 'isfullaccess');
		 					});
		 				}
						return;
					}
				});
    		}
    		selectOrUnselectModule(selectedObj);
    		$scope.newJson = JSON.stringify($scope.masterjson);
    	};
    	 
     	$scope.changeLevel = function(key) {
     		if(key == '' || metaJson == undefined){
     			return;
     		}
     		$scope.masterjson = { children : metaJson[key]}
     	};
     	
     	var readyObject = function () {
     		$scope.role = angular.copy(roleObj);
 			$scope.categories = angular.copy(categories);
     		if(userInfo.roleID != 'DA'){
     			$scope.role.category = 'C';
     			$scope.categories.splice(0, 1);
     		} else {
     			$scope.role.category = 'GC';
     		}
     		$scope.changeLevel($scope.role.category);
     	};
     	
     	var loadMetaJSON = function () {
     		var request = { 
     			loginBean : userInfo,
    			oid : 'MC_Features',
    			operation : constantService.GetMetaDataByOID
        	};
     		promis = metaService.postObject(request);
			promis.then(function (data) {
				ngProgress.complete();
				loadService.hideDialog();
	    		if (!data.success) {
	    			growl.error('Unable to load Data from meta', {ttl: 3000});
					return;
				}
	    		metaJson = angular.fromJson(data.data.valueJson);
	    		readyObject();
			});
        };
	    	
      	var loadStatus = function () {
      		ngProgress.start();
      		loadService.showDialog();
      		$http.get('config/status.json').success(function(data) {
  				$scope.statusList = data;
  		    });
          	loadMetaJSON();
      	};
  	    	
	 	var init = function () {
	 		 userInfo = authorizationService.getUserInfo();
			 $scope.successMsg = "Successfully saved role";
	    	 $scope.errorMsg = "Unable to save role";
			 loadStatus();
	 	};

	 	init();
	 	
	};
	 
    app.register.controller('roleController', ['growl', '$rootScope', '$scope', '_', 'messageService', 'roleService',
    'constantService', 'ngProgress', 'loadService', '$http', 'authorizationService', 'modalService', 'metaService', roleController]);
	
});

