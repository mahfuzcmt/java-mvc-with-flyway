
'use strict';

define(['app'], function (app) {
	
	var userAuctionRoundController = function ($rootScope, $scope, _, messageService,
		auctionService, roleService, constantService, navigationService, localStorageService, 
		configurationService,  ngProgress, loadService, $upload, $http, authorizationService,
		modalService, $routeParams, $websocket, bidderService, growl) {
		
		var userInfo, promis;
		$scope.countDownClock = { isShow : false, duration : 0 };
		$scope.roundButton = { isShow : false };
		$scope.breakButton = { isShow : false };
		$scope.breakTimer = { isShow : false, duration : 0 };
		$scope.breakRequest = { isShow : false };
		$scope.greetingMsg = { isShow : false };
		
		var modalDefaults = {
	        templateUrl: 'app/partials/breakRequestModal.html'
    	};
		
		var modalOptions = {
            actionButtonText	: 'Submit',
            closeButtonText		: 'Cancel',
            headerText			: 'Enter Reason'
  	    };
		 
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
	  	    if($scope.webSocketData.key == 'breakRoundStart') {
		  	  	$scope.countDownClock.isShow = false;
				$scope.roundButton.isShow = false;
		  	    $scope.breakButton.isShow = true;
				$scope.breakTimer.isShow = false;
		  	    growl.info('Break Start', {title: 'Information'} );
				$scope.$apply();
	  	  	} else if($scope.webSocketData.key == 'breakTimeCountDown'){
				/*angular.forEach($scope.data.bidderData, function(value, index){
					if (value.oid == val.bidderOid) {
						value.breakStatus = val.breakStatus;
						growl.info('Break request has beean accepted with Status '+val.breakStatus, {title: 'Info!'} );
						$scope.$apply();
					}
	            });*/
	  	  		
		  	  	var time = val.duration;
	  	  		var minutes = Math.floor(time / 60);
	  	  		var seconds = time - minutes * 60;
		  	  	if(minutes <10){
		  	  		var minutes = '0' + minutes;
		  	  	}
			  	if(seconds <10){
			  	  	var seconds = '0' + seconds;
			  	}
	  	  		var time = minutes+':'+ seconds;
	  	  		
				$scope.breakTimer.duration = time;
		  	  	$scope.countDownClock.isShow = false;
		  	    $scope.roundButton.isShow = false;
		  	    $scope.breakButton.isShow = false;
		  	    $scope.breakTimer.isShow = true;
				$scope.$apply();
	  	    	/*if(val.status == 'Running'){
			  	  	$scope.countDownClock.isShow = false;
			  	    $scope.roundButton.isShow = false;
			  	    $scope.breakButton.isShow = false;
			  	    $scope.breakTimer.isShow = true;
		  	    	updateUI();	
					$scope.$apply();
	  	    	}*/
			} else if($scope.webSocketData.key == 'breakRequest'){
				 growl.info('Break Start by Auctioneer', {title: 'Information'} );
				 $scope.$apply();
			} else if ($scope.webSocketData.key == 'breakRequestReject') {
  	    		if(userInfo.bidderOid == val.bidderOid) {
					growl.warning('A Break request has been '+val.breakStatus, {title: 'Warning'} );
					$scope.$apply();
				}
			} else if($scope.webSocketData.key == 'breakTimeStop'){
				$scope.breakTimer.isShow = false;
		  	  	$scope.countDownClock.isShow = false;
				$scope.roundButton.isShow = false;
				$scope.breakButton.isShow = true;
				growl.info('Break is over', {title: 'Info!'} );
				$scope.$apply();
			} else if ($scope.webSocketData.key == 'roundStart') {
				$scope.data.auctionRoundData.unshift(val);
		  	  	$scope.countDownClock.isShow = true;
				$scope.roundButton.isShow = true;
		  	    $scope.breakButton.isShow = false;
				$scope.breakTimer.isShow = false;
				$scope.textAmount = val.amount;
				console.log($scope.textAmount);
		  	    growl.info('Start '+val.roundName, {title: 'Information'} );
				$scope.$apply();
	  	  	} else if ($scope.webSocketData.key == 'roundCountDown') {
	  	  		// TO DO Time Format
	  	  		var time = val.duration;
	  	  		var minutes = Math.floor(time / 60);
	  	  		var seconds = time - minutes * 60;
		  	  	if(minutes <10){
		  	  		var minutes = '0' + minutes;
		  	  	}
			  	if(seconds <10){
			  	  	var seconds = '0' + seconds;
			  	}
	  	  		var time = minutes+':'+ seconds;
	  	  		if(val.status == 'Running'){
					$scope.countDownClock.duration = time;
			  	  	$scope.countDownClock.isShow = true;
					$scope.breakButton.isShow = false;
					$scope.breakTimer.isShow = false;
					$scope.$apply();
	  	    	} else {
			  	  	$scope.countDownClock.isShow = false;
					$scope.roundButton.isShow = false;
					$scope.breakButton.isShow = true;
					$scope.$apply();
	  	    	}

	  	  		/*$scope.countDownClock.duration = val.duration;
		  	  	$scope.countDownClock.isShow = true;
				$scope.roundButton.isShow = false;
		  	    $scope.breakButton.isShow = false;
				$scope.breakTimer.isShow = false;
				$scope.$apply();*/
				
	  	  	} else if ($scope.webSocketData.key == 'roundStop') {
				$scope.data.auctionRankingData = val.auctionRankingData;
		  	  	$scope.countDownClock.isShow = false;
				$scope.roundButton.isShow = false;
		  	    $scope.breakButton.isShow = true;
				$scope.breakTimer.isShow = false;
				$scope.data.auctionRoundData[0].status = 'Closed';
				if(val.status == 'Closed'){
					$scope.breakButton.isShow = false;
					var text = val.auctionRankingData[0].organization;
					$scope.greetingTextMsg = text;
					$scope.greetingMsg.isShow = true;
				}
		  	    growl.warning(val.roundName+' is Closed', {title: 'Information'} );
				$scope.$apply();
	  	  	} else if ($scope.webSocketData.key == 'bidderBid') {
		  	  	var obj = {};
            	obj.sortOrder = val.sortOrder;
            	obj.bidderName = val.bidderName;
            	obj.strRequestTime = val.strRequestTime;
            	if($scope.data.auctionRoundData[0].roundRankingList == undefined || $scope.data.auctionRoundData[0].roundRankingList == null){
            		$scope.data.auctionRoundData[0].roundRankingList = [];
            	}
	  	    	$scope.data.auctionRoundData[0].roundRankingList.push(obj);
				$scope.$apply();
	  	  	} else if($scope.webSocketData.key == 'bidderBreakRequest'){
				$scope.countDownClock.isShow = false;
		  	    $scope.roundButton.isShow = false;
		  	    $scope.breakButton.isShow = false;
		  	    $scope.breakTimer.isShow = false;
				$scope.breakRequest = { isShow : true };
				$scope.breakRequest.requestBy = val.requestBy;
				$scope.breakRequest.bidderOid = val.bidderOid;
				$scope.breakRequest.auctionRoundOid = val.auctionRoundOid;
				$scope.breakRequest.auctionOid = val.auctionOid;
				$scope.breakRequest.duration = val.duration;
				$scope.breakRequest.oid = val.oid;
				$scope.breakRequest.causeText = val.causeText;
				growl.warning('Break Request comes from '+val.requestBy, {title: 'Break Request'} );
				$scope.$apply();
			}
  	    	//updateUI();	  	
		}); 

		$scope.doBreakRequest = function(){
			modalService.showModal(modalDefaults, modalOptions).then(function (causeText) {   
				var obj = {};
				obj.loginBean = userInfo;
				obj.auctionOid = $routeParams.oid;
				obj.auctionRoundOid = $scope.data.auctionRoundData[0].oid;
				obj.bidderOid = userInfo.bidderOid;
				obj.causeText = causeText;
				ngProgress.start();      	    	
				promis = bidderService.breakRound(obj);
				promis.then(function (data){
					ngProgress.complete();
					if(!data.success){
						messageService.showMessage(constantService.Danger, data.code);
						navigationService.goToTop();
						return;
					}
					messageService.showMessage(constantService.Success, data.code);
					navigationService.goToTop();
				});
	         });
		};
		
		$scope.showBreakRequestLog = function () {
 	    	navigationService.showPageWithData('breakRequestList', $routeParams.oid);
 	    };
		
		$scope.startBid = function(){
			ngProgress.start();		
			loadService.showDialog();
			var obj = {};
			obj.loginBean = userInfo;
			obj.auctionOid = $routeParams.oid;
			obj.bidderOid = userInfo.bidderOid;
			obj.auctionRoundOid = $scope.data.auctionRoundData[0].oid;
			promis = bidderService.startBid(obj);
			promis.then(function (data) {
				loadService.hideDialog();
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				navigationService.goToTop();
				messageService.showMessage(constantService.Success, data.code);
				//$scope.countDownClock.isShow = false;
				$scope.roundButton.isShow = false;
			});
		};
		 
		var updateUI = function(){
			if($scope.data.auctionRoundData == undefined || $scope.data.auctionRoundData == null){
				$scope.data.auctionRoundData = [];
			}
			if($scope.data.auctionRankingData == undefined || $scope.data.auctionRankingData == null){
				$scope.data.auctionRankingData = [];
			}
			angular.forEach($scope.data.auctionRoundData, function(value, index){
				if(value.roundRankingList  == undefined || value.roundRankingList == null){
					value.roundRankingList = [];
				}
            });
			
			if($scope.data.auctionRoundData.length != 0){
				if($scope.data.auctionRoundData[0].status == 'Running'){
					//$scope.roundButton.isShow = false;
				} else {
					//$scope.roundButton.isShow = true;
					$scope.roundButton.roundName = $scope.data.auctionRoundData.length + 1;
				}
			} else {
				$scope.roundButton.roundName = 1;
			}
			//$scope.$apply();
		};
		
		
		var getAuctionByOID = function () {
			var obj = {};
    		obj.oid = $routeParams.oid;
    		obj.loginBean = userInfo;
    		obj.bidderOid = userInfo.bidderOid;
			promis = auctionService.getAuctionByOID(obj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				$scope.data = data.data;
				
				// 1. Round Clock
				if ($scope.data.auctionData.lastAuctionRoundData != null
					&& $scope.data.auctionData.lastAuctionRoundData.status == "Running") {
					$scope.countDownClock.isShow = true;
					//$scope.roundButton.roundName = $scope.data.auctionData.lastAuctionRoundData.roundName;
				}
				
				// 2. Break Clock
				if ($scope.data.auctionData.lastBreakRequestData != null
						&& $scope.data.auctionData.lastBreakRequestData.schedulerStatus != null
						&& $scope.data.auctionData.lastBreakRequestData.schedulerStatus == "Running") {
					$scope.breakTimer.isShow = true;
				}
				
				// 3. Bid Button 
				if ($scope.data.auctionData.status == 'Open' && $scope.data.auctionData.lastAuctionRoundData != null 
					&& $scope.data.auctionData.lastAuctionRoundData.status == 'Running'
					&& ($scope.data.auctionData.lastBreakRequestData == null  
					|| $scope.data.auctionData.lastBreakRequestData.schedulerStatus == null
					|| $scope.data.auctionData.lastBreakRequestData.schedulerStatus == "Closed") ) {

					var isExist = false;
					var keepGoing = true;
					angular.forEach($scope.data.auctionRoundData, function(round, index){
						if (keepGoing && round.oid == $scope.data.auctionData.lastAuctionRoundData.oid) {
							angular.forEach(round.roundRankingList, function(roundRanking, index){
								if (keepGoing && roundRanking.bidderOid == userInfo.bidderOid) {
									isExist = true;
								    keepGoing = false;
								}
							});
						}
		            });
					if (!isExist) {
						$scope.roundButton.isShow = true;
					}
				}
				
				// Break Request Button 
				if ($scope.data.auctionData.status == 'Open' 
					&& ($scope.data.auctionData.lastAuctionRoundData != null
					&& $scope.data.auctionData.lastAuctionRoundData.status == 'Closed')
					&& ($scope.data.auctionData.lastBreakRequestData == null
					|| $scope.data.auctionData.lastBreakRequestData.status == 'Rejected'
					|| $scope.data.auctionData.lastBreakRequestData.status == 'Pending'
					|| ($scope.data.auctionData.lastBreakRequestData.status == 'Approved'
					&& $scope.data.auctionData.lastBreakRequestData.schedulerStatus == "Closed")) ) {
					
					var isExist = false;
					var keepGoing = true;
					angular.forEach($scope.data.bidderData, function(bidder, index){
						if(keepGoing && $scope.data.auctionData.lastBreakRequestData == null){
							isExist = true;
						    keepGoing = false;
						} else {
							if (keepGoing && bidder.oid == userInfo.bidderOid) {
								bidder.breakStatus = $scope.data.auctionData.lastBreakRequestData.breakStatus;
								if (bidder.breakLimit > bidder.usedBreakLimit) {
									isExist = true;
								    keepGoing = false;
								}
							}
						}
		            });
					if (isExist) {
						$scope.breakButton.isShow = true;
					}
				}
				
				 if($scope.data.auctionData.status == 'Closed'){
				  	    $scope.greetingTextMsg = $scope.data.auctionRankingData[0].organization;
						$scope.greetingMsg.isShow = true;
				    }
				
			});
    	};
    	
    	var init = function () {
    		userInfo = authorizationService.getUserInfo();
			ngProgress.start();
			if($routeParams.oid != undefined && $routeParams.oid != null && $routeParams.oid.trim().length != 0){
				getAuctionByOID();
			}
	 	};

	 	init();
	 	
	};
	 
    app.register.controller('userAuctionRoundController', ['$rootScope', '$scope', '_', 'messageService', 'auctionService', 'roleService',
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 'loadService', '$upload', 
    '$http', 'authorizationService', 'modalService', '$routeParams', '$websocket', 'bidderService', 'growl', userAuctionRoundController]);
	
});

