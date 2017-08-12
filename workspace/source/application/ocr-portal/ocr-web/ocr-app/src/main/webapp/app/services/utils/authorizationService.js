
'use strict';

define(['app', 'services/utils/configurationService', 'services/utils/navigationService',
        'services/utils/languageService', 'services/utils/localStorageService', 'services/utils/constantService'], 
        function (app) {

    var authorizationService = function ($location, $rootScope, $route, $window, $http, $cookieStore,
    		configurationService, navigationService, languageService, localStorageService, constantService) {
    	
    	var userInfo;

        this.getUserInfo = function () {
        	userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
        	if(userInfo == undefined || userInfo == null){
        		return null;
        	}
        	var user = {};
        	user.loginID = userInfo.loginID;
        	user.roleID = userInfo.roleID;
        	user.roleDescription = userInfo.roleDescription;
        	user.name = userInfo.name;
        	user.imagePath = userInfo.imagePath;
        	user.status = userInfo.status;
        	user.sessionId = userInfo.sessionId;
        	user.orgID = userInfo.orgID;
        	user.orgName = userInfo.orgName;
        	user.instanceID = userInfo.instanceID;
        	user.nodeID = userInfo.nodeID;
        	user.mnememonic = userInfo.mnememonic;
        	user.phoneno = userInfo.phoneno;
        	user.roleType = userInfo.roleType;
        	user.menuJSON = userInfo.menuJSON;
        	user.instanceType = userInfo.instanceType;
            return user;
        };

        this.setSelectedMenu = function (url) {
			localStorageService.setValue(constantService.selectMenuInfoCookieStoreKey, url);
        };
        
        this.getMenu = function () {
        	userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
        	var webMenu;
        	var menu = $.parseJSON(userInfo.menuJSON);
        	
        	if(menu.children != undefined){
    			for(var i=0; i< menu.children.length; i++){
    				if(menu.children[i].id == "webMenu"){
    					webMenu = menu.children[i].children;
    				}
    			}
			}
        	
        	var newMenu = [];
        	var child = [];
            angular.forEach(webMenu, function(itm, index) {
            	if(itm.enable){
            		if(itm.children.length>0){
            			var newArrayForChild = [];
            			angular.forEach(itm.children, function(cld, index){
                			if(cld.enable && !cld.isPageItem){
                				newArrayForChild.push(cld);
                			}
                        });
            			itm.children = newArrayForChild;
            		}
            		newMenu.push(itm);
            	}
            });
        	
            return newMenu;
        };
        
        this.getHiddenSubMenu = function () {
        	userInfo = localStorageService.getValue(constantService.userInfoCookieStoreKey);
        	var webMenu;
        	var menu = $.parseJSON(userInfo.menuJSON);
        	
        	if(menu.children != undefined){
    			for(var i=0; i< menu.children.length; i++){
    				if(menu.children[i].id == "webMenu"){
    					webMenu = menu.children[i].children;
    				}
    			}
			}
        	
        	var newMenu = [];
        	var child = [];
            angular.forEach(webMenu, function(itm, index) {
            	if(itm.enable){
            		if(itm.children.length>0){
            			var newArrayForChild = [];
            			angular.forEach(itm.children, function(cld, index){
                			if(cld.enable && cld.isPageItem){
                				newArrayForChild.push(cld);
                			}
                        });
            			itm.children = newArrayForChild;
            		}
            		newMenu.push(itm);
            	}
            });
            return newMenu;
        };

        $rootScope.isLoggedIn = function () {
            return ($rootScope.loginInfo != null);
        };
            
       this.signOut = function () {
    		delete $http.defaults.headers.common['X-Auth-Token'];
            localStorageService.setValue(constantService.userInfoCookieStoreKey, null);
            localStorageService.setValue(constantService.progressInfoCookieStoreKey, null);
            console.log( localStorageService.getValue(constantService.progressInfoCookieStoreKey));
            $location.path('/');
        };
        
        this.authorizeLeftMenu = function (leftMenuId) {
        	var menuJson = localStorageService.getData(configurationService.loginMetaData).data.roleBean.menuJSON;
            for (var topMenuIndex = 0; topMenuIndex < menuJson.length; topMenuIndex++) {
                var leftMenuList = menuJson[topMenuIndex].leftmenuids;
                for (var leftMenuIndex = 0; leftMenuIndex < leftMenuList.length; leftMenuIndex++) {
                    if (leftMenuId == leftMenuList[leftMenuIndex]) {
                        return true;
                    }
                }
            }
            return false;
        };
        
        this.getMenuListForTree = function (menuJSON) {
        	var webMenu;
        	var menu = $.parseJSON(menuJSON);
        	if(menu.children != undefined){
    			for(var i=0; i< menu.children.length; i++){
    				if(menu.children[i].id == "webMenu"){
    					webMenu = menu.children[i].children;
    				}
    			}
			}
        	
        	var newMenu = [];
        	var child = [];
            angular.forEach(webMenu, function(itm, index) {
            		if(itm.children.length>0){
            			var newArrayForChild = [];
            			angular.forEach(itm.children, function(cld, index){
            				newArrayForChild.push(cld);
                        });
            			itm.children = newArrayForChild;
            		}
            		newMenu.push(itm);
            });
            var menuJSON = {
            		  		"children": [
            		               {
            		                 "id": "webMenu",
            		                 "url": "webMenu",
            		                 "text": "Web Menu",
            		                 "enable": true,
            		                 "children": newMenu
            		               }
            		             ]
            		           };
            return menuJSON;
        };
        
    };
    
    app.service('authorizationService', ['$location', '$rootScope', '$route', '$window', '$http', '$cookieStore', 
          'configurationService', 'navigationService', 'languageService', 'localStorageService', 'constantService',
          authorizationService]);

});
