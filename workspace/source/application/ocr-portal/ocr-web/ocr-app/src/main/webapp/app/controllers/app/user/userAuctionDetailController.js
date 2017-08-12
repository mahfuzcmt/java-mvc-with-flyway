
'use strict';

define(['app'], function (app) {
	
	var userAuctionDetailController = function ($rootScope, $scope, _, messageService,
		auctionService, roleService, constantService, navigationService, localStorageService, 
		configurationService,  ngProgress, loadService, $upload, $http, authorizationService,
		modalService, $routeParams, $websocket, bidderService, growl) {
		
		var userInfo, promis;
		$scope.bidderData = [];
		$scope.roundButton = { isShow : false };
		$scope.joinTimer = { isShow : false, duration : 0 };
		var ws = $websocket.$get(configurationService.wsDashboard);
		ws.$open();
		 
		$scope.$on('$destroy', function () {
			ws.$close();
		});
		
		ws.$on('$close', function(data) {
			console.log('ws closed');
		});
		
		ws.$on('$open', function() {
			console.log('connected');
		});
		
		ws.$on('$error', function (response) {
			console.log('disconnected');
 		});
		
		ws.$on('$message', function (res) {
			if(res == "connected" || res == "disconnected" || res == "close"){
				return;
			}
			$scope.webSocketData = JSON.parse(res);
			var val = $scope.webSocketData.value;
	  	    if ($scope.webSocketData == undefined || $scope.webSocketData.key == undefined) {
	  	    	return;
	  	  	}
		  	if ($scope.webSocketData.key == 'join') {
		          $scope.bidderData.unshift(val); 
		          growl.info('New Join request from '+val.organization, {title: 'Info!'} );
		          $scope.$apply();
		    } else if ($scope.webSocketData.key == 'AuctionJoinStartCountDown') {
		    	$scope.joinTimer.isShow = true;
	  	  	    var time = val.joinDurationTime;
	  	  	    var minutes = Math.floor(time / 60);
	  	  	    var seconds = time - minutes * 60;
		  	  	if(minutes <10){
		  	  		var minutes = '0' + minutes;
		  	  	}
			  	if(seconds <10){
			  	  	var seconds = '0' + seconds;
			  	}
			  	var time = minutes+':'+ seconds;
	  	  	    $scope.joinTime = time;
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'auctionJoinStop') {
				$scope.joinTimer.isShow = false;
				var status = val.status 
				if(status == 'Inactive'){
				   $scope.roundButton.isShow = true;
				}
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'bidderAcceptanceStatus') {
				angular.forEach($scope.bidderData, function(value, key) {
	  	    		if (val.oid == value.oid) {
	  	    			value.status = val.status;
	  	    			growl.info('Bidder Status Changed to '+val.status, {title: 'Info!'} );
	  	    		}
	  	        });
  	    		
			} else if ($scope.webSocketData.key == 'updateAuctionStatus') {
				if(val.status == 'Open'){
  	  				navigationService.showPageWithData('userauctionround', val.oid);
  	  			 }
			}
		  	$scope.$apply();
		  	
		}); 
		
		$scope.goToRound = function () {
			navigationService.showPageWithData('auctionround', $routeParams.oid);
		};
		
		$scope.updateStatus = function (auctionObj, status) {
			auctionObj.status = status;
			auctionObj.loginBean = authorizationService.getUserInfo();
			promis = auctionService.updateAuctionStatus(auctionObj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				messageService.showMessage(constantService.Success, data.code);
				navigationService.goToTop();
				navigationService.showPageWithData('auctionround', auctionObj.oid);
				
			});
    	};

		var getAuctionByOID = function () {
			var obj = {};
    		obj.oid = $routeParams.oid;
    		obj.loginBean = userInfo;
			promis = auctionService.getAuctionByOID(obj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				$scope.data = data.data;
				getBidderByAuctionOID();
			});
    	};
    	
    	$scope.updateBidderStatus = function (data, status) {
			var obj = { oid : data.oid, auctionOid : $routeParams.oid };
    		obj.status = status;
    		obj.bidderOid = data.bidderOid;
    		obj.loginBean = userInfo;
			promis = auctionService.updateBidderStatus(obj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				messageService.showMessage(constantService.Success, data.code);
				navigationService.goToTop();
			});
    	};
		
    	
    	var getBidderByAuctionOID = function () {
			var obj = {};
    		obj.oid = $routeParams.oid;
    		obj.loginBean = userInfo;
			promis = auctionService.getBidderByAuctionOID(obj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				$scope.bidderData = data.data;
			});
    	};
    	
    	var getAllBreakRequest = function () {			
			var reqObj = { operation : constantService.GetAllAuction };
			reqObj.auctionOid =  $routeParams.oid;
        	promis = auctionService.getAllBreakRequest(reqObj);
            promis.then(function (data) {
   		     ngProgress.complete();
    			if (!data.success) {
            		messageService.showMessage(constantService.Danger, data.code);
                    return;
                }
            	$scope.breakRequest = data.data;
            });
        };
        
    	var init = function () {
    		userInfo = authorizationService.getUserInfo();
    		if($routeParams.oid != undefined && $routeParams.oid != null && $routeParams.oid.trim().length != 0){
    			getAuctionByOID();
			}
	 	};

	 	init();
	 	
	};
	 
    app.register.controller('userAuctionDetailController', ['$rootScope', '$scope', '_', 'messageService', 'auctionService', 'roleService',
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 'loadService', '$upload', 
    '$http', 'authorizationService', 'modalService', '$routeParams', '$websocket', 'bidderService', 'growl', userAuctionDetailController]);
	
});

