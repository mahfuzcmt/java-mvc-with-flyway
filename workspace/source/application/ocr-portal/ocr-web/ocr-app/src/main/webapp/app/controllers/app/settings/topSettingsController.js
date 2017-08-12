'use strict';

define(['app'], function (app) {
	
	var topSettingsController = function ($rootScope, $scope, $log, $upload, $routeParams, modalService, loadService, 
		growl, authorizationService, constantService, userService, configurationService, navigationService, localStorageService) {
		
		var userInfo, promis;
		var userObj = { groupOfCompanyName : '', loginID : '', password : '', userName : '', googleID : '', userImagePath : '' };

		$scope.reset = function(){
			document.getElementById("gcLogo").src = '';
			document.getElementById("userImage").src = '';
			init();
		};

		$scope.cancel = function(){
        	navigationService.menuNavigation('topsettings');
        };
		
	    $scope.saveOrUpdateUser = function(model) {
	    	var user = angular.copy(model);
            if (!userService.validateTopSettings(user)) {
                return;
            }
            userInfo = authorizationService.getUserInfo();
            user.loginBean = userInfo;
			$scope.responseMsg = "Successfully save user";
 			user.operation = constantService.Save;

            if($routeParams.loginID != undefined && $routeParams.loginID != null && $routeParams.loginID.trim().length != 0) {
                user.operation = constantService.Update;
    			$scope.responseMsg = "Successfully update user";
            }
            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: ' Confirmation',
                bodyText: 'Are you sure to proceed with information?'
            };
            var modalDefaults = {
                templateUrl: 'app/partials/confirmation.html'
            };
            modalService.showModal(modalDefaults, modalOptions).then(function(result) {
                if (result == 'cancel') {
                    return;
                }
                loadService.showDialog();
                promis = userService.postObject(user);
                promis.then(function(data) {
                    loadService.hideDialog();
                    if(!data.success) {
    					growl.error(data.message, {ttl: 3000});
                        return;
                    }
					growl.success($scope.responseMsg, {ttl: 3000});
                    if(user.operation == constantService.Update){
						navigationService.menuNavigation('topsettings');
						return;
					}
    				userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
    				userInfo.groupOfCompanyName = user.groupOfCompanyName;
    				localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
    	        	navigationService.menuNavigation('topsettings');
                });
            });

        };
		
        $scope.upload = function(files, type) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if(file.size /(1024*1024)>1){
						growl.error("Image size should not be more than 1 Megabyte", { ttl: 3000 });
						return;
					}
                    $upload.upload({
                        url: configurationService.fileupload + "?folderName="+type,
                        fields: { 'userName': 'Test' },
                        file: file
                    }).progress(
                        function(evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $log.debug('Progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        }).success(function(data, status, headers, config) {
                        if ($scope.user != undefined) {
                            if (type == 'groupofcompany') {
                                $scope.user.gcLogoPath = data.data;
                            } else if (type == 'user') {
                                $scope.user.userImagePath = data.data;
                            }
                        }
                    }).error(function(data, status, headers, config) {
                        if (type == 'groupofcompany') {
                            $scope.user.gcLogoPath = '';
                        } else if (type == 'user') {
                            $scope.user.userImagePath = '';
                        }
                    });;
                }
            }
        };
        
 	    var loadGroupOfCompanyData = function() {
 	    	var obj = { operation : constantService.GetGroupOfCompany, groupOfCompanyOID: userInfo.groupOfCompanyOID };
 	    	promis = userService.postObject(obj);
 	    	promis.then(function (responseData) {
 	    		if (!responseData.success) {
 	    			growl.error("Unable to load group of company data!", {ttl: 3000});
                     return;
 	    		}
      			$scope.user = responseData.data;
 	    	});
 	    };
        
 	    var loadUserDataByLoginID = function() {
 	    	var obj = { operation : constantService.GetDataByOID, loginID : $routeParams.loginID };
 	    	promis = userService.postObject(obj);
 	    	promis.then(function (responseData) {
 	    		if (!responseData.success) {
 	    			growl.error("Unable to load user data!", {ttl: 3000});
                     return;
 	    		}
      			$scope.user = responseData.data;
 	    	});
 	    };
		
		var init = function(){
			userInfo = authorizationService.getUserInfo();
			$scope.user = angular.copy(userObj);
			if($routeParams.loginID != undefined && $routeParams.loginID != null && $routeParams.loginID.trim().length != 0){
	 			$scope.formHeader = 'Update User';
	 			$scope.btnText = "Update";
				$scope.responseMsg = "Successfully save user";
				$scope.isUpdate = true;
				loadUserDataByLoginID();
	 		} else {
	 			$scope.formHeader = 'User';
	 			$scope.btnText = "Save";
				$scope.responseMsg = "Successfully update user";
				loadGroupOfCompanyData();
	 		}
		};
		
		init();
		
	};

    app.register.controller('topSettingsController', ['$rootScope', '$scope', '$log', '$upload', '$routeParams',
    	'modalService', 'loadService', 'growl', 'authorizationService', 'constantService', 'userService', 
    	'configurationService', 'navigationService', 'localStorageService', topSettingsController]);

});

