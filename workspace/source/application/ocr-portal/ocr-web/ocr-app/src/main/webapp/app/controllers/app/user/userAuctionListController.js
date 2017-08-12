
'use strict';

define(['app'], function (app) {
    
	 var userAuctionListController = function ($rootScope, $scope, $websocket, $modal, _, $filter, messageService, 
		 auctionService, constantService, navigationService, localStorageService, 
		 configurationService, ngProgress, loadService, authorizationService, growl, bidderService) {
	    	
	    var userInfo, promis;
		
    	$scope.pageSize = 6;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        
        $scope.pageDataBegin = 0;
        $scope.pageDataEnd = 0;
        $scope.pageDataTotal = 0;
        $scope.pageItemText = "";
        
        $scope.auctions = [];
        $scope.filteredAuctions = [];
        $scope.filteredTotalRecords = 0;
        $scope.joinTimer = { isShow : false, duration : 0 };
        $scope.roundButton = { isShow : false };
        
	    var wss = $websocket.$get(configurationService.wsDashboard);
		wss.$open();
		 
		$scope.$on('$destroy', function () {
			wss.$close();
		});
		
		wss.$on('$close', function(data) {
			console.log('wss closed');
		});
		
		wss.$on('$open', function() {
			console.log('connected');
		});
		
		wss.$on('$error', function (response) {
			console.log('disconnected');
 		});
		
		wss.$on('$message', function (res) {
			if(res == "connected" || res == "disconnected" || res == "close"){
				return;
			}
			
			$scope.webSocketData = JSON.parse(res);
			if ($scope.webSocketData == undefined || $scope.webSocketData.key == undefined) {
	  	    	return;
	  	  	}
			var val = $scope.webSocketData.value;
			if ($scope.webSocketData.key == 'updateAuctionStatus') {
				var isExist = false;
				var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.oid){
    					auction.title = val.title;
    					auction.basePrice = val.basePrice;
    					auction.status = val.status;
    				    keepGoing = false;   
    				    isExist = true; 	
    				}
	            });
    			if(!isExist){
					$scope.auctions.unshift($scope.webSocketData.value);
    			}	
            	filterAuctions($scope.searchText);
				growl.info('Auction Updated ', {title: 'Info!'} );
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'join') {
				/*var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.auctionOid){
    					auction.doJoin = val.status;
    				    keepGoing = false;    	
    				}
	            });
            	filterAuctions($scope.searchText);
				growl.info('Auction Join is done', {title: 'Info!'} );
	  	    	$scope.$apply();*/
	  	    	
	  	    	
	  	    	var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.auctionOid){
    					if(userInfo.bidderOid == val.bidderOid){
        					auction.doJoin = val.status;
        					keepGoing = false;
        					growl.info('Your request is Pending', {title: 'Info!'} );
    					}
    				}
	            });
            	filterAuctions($scope.searchText);
	  	    	$scope.$apply();
	  	    	
	  	    	
	  	    	
	  	    	
	  	    	
			} else if ($scope.webSocketData.key == 'AuctionJoinStart') {
				var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.oid){
    					auction.status = 'Active';
    					auction.doJoin = 'yes';
    				    keepGoing = false;    					
    				}
	            });
            	filterAuctions($scope.searchText);
            	if(val.status == 'Active'){
  	  				navigationService.showPageWithData('userAuctionDetail', val.oid);
  	  			 }
				growl.info('Auction Join CountDown has been Started.', {title: 'Info!'} );
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'testSystemStatus') {
				growl.info( val.systemTestMessage, {title: 'Info!'} );
	  	    	$scope.$apply();
			}else if ($scope.webSocketData.key == 'AuctionJoinStartCountDown') {
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
	  	  	    $scope.joinTime = minutes+':'+ seconds;
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'auctionJoinStop') {
				$scope.joinTimer.isShow = false;
	  	    	var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.oid){
    					auction.status = val.status;
    				    keepGoing = false;    					
    				}
	            });
            	filterAuctions($scope.searchText);
				growl.info('Auction Join CountDown has been Stopped.', {title: 'Info!'} );
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'bidderAcceptanceStatus') {
  	    		var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.auctionOid){
    					if(userInfo.bidderOid == val.bidderOid){
        					auction.doJoin = val.status;
        					keepGoing = false;
        					growl.info('You are '+val.status, {title: 'Info!'} );
    					}
    				}
	            });
            	filterAuctions($scope.searchText);
	  	    	$scope.$apply();
			} else if ($scope.webSocketData.key == 'addAuction') {
				if($scope.webSocketData.value.status != 'Draft'){
					$scope.auctions.unshift($scope.webSocketData.value);
	            	filterAuctions($scope.searchText);
					growl.info('New Auction Added ', {title: 'Info!'} );
		  	    	$scope.$apply();
				}
			} else if ($scope.webSocketData.key == 'updateAuction') {
				/*var isExist = false;
    			angular.forEach($scope.filteredAuctions, function(value, index){
    				if(value.oid == $scope.webSocketData.value.oid){
    					value.title = $scope.webSocketData.value.title;
    					value.basePrice = $scope.webSocketData.value.basePrice;
    					value.status = $scope.webSocketData.value.status;
    					growl.info('Auction Updated ', {title: 'Info!'} );
    					isExist = true;
    				}
	            });
    			if(!isExist){
					$scope.filteredAuctions.unshift($scope.webSocketData.value);
    			}
	  	    	$scope.$apply();*/
	  	    	
	  	    	var isExist = false;
				var keepGoing = true;
                angular.forEach($scope.auctions, function(auction, index){
    				if(keepGoing && auction.oid == val.oid){
    					auction.title = val.title;
    					auction.basePrice = val.basePrice;
    					auction.status = val.status;
    				    keepGoing = false;   
    				    isExist = true; 	
    				}
	            });
    			if(!isExist){
					$scope.auctions.unshift($scope.webSocketData.value);
    			}	  	    	
            	filterAuctions($scope.searchText);
				growl.info('Auction Updated ', {title: 'Info!'} );
	  	    	$scope.$apply();
	  	    	
			}
		}); 
		  
	    $scope.navigatePage = function (auctionObj) {
	    	if(auctionObj.status == 'Open'){
	        	navigationService.showPageWithData('userauctionround', auctionObj.oid);
	    	} else if(auctionObj.status == 'Closed'){
	        	navigationService.showPageWithData('reportauction', auctionObj.oid);
	    	} 
	    };
    	
    	var filterAuctions = function (filterText) {
        	$scope.filteredAuctions = $filter("auctionFilter")($scope.auctions, filterText);
        	$scope.filteredTotalRecords =  Math.ceil($scope.filteredAuctions.length);
        	$scope.pageDataTotal = $scope.filteredTotalRecords;
        	if($scope.pageDataTotal == 0){
        		$scope.pageDataBegin = 0;
            	$scope.pageDataEnd = 0;        		    		
    		} else {
        		$scope.pageDataBegin = (($scope.currentPage - 1) * $scope.pageSize) + 1;
            	$scope.pageDataEnd = $scope.pageDataBegin + $scope.pageSize - 1;    		
    		}
        	
        	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
        		$scope.pageDataEnd = $scope.pageDataTotal
        	}  
        	       	
    		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, $scope.pageDataTotal, "Auctions", 'English');
        };

        $scope.numPages = function () {
        	return Math.ceil($scope.auctions.length / $scope.pageSize);
        };
    	
    	var createWatches = function () {
        	$scope.$watch("searchText", function (filterText) {
        		filterAuctions(filterText);
            	$scope.currentPage = 1;
            });
            
            $scope.$watch('currentPage + pageSize', function() {
            	var begin = (($scope.currentPage - 1) * $scope.pageSize), end = begin + ($scope.pageSize - 0);
            	$scope.filteredAuctions = $scope.auctions.slice(begin, end);
            	$scope.pageDataTotal = $scope.filteredTotalRecords;
            	if($scope.pageDataTotal == 0) {
            		$scope.pageDataBegin = 0;
                	$scope.pageDataEnd = 0;        		    		
        		} else {
            		$scope.pageDataBegin = begin + 1;
                	$scope.pageDataEnd = end;
        		}
            	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
            		$scope.pageDataEnd = $scope.pageDataTotal
            	}
        		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, $scope.pageDataTotal, "Auction", "English");
            });
        };
        
        $scope.join = function(obj){
			ngProgress.start();
			var joinObj = {};
			joinObj.loginBean = userInfo;
			joinObj.auctionOid = obj.oid;
			joinObj.bidderOid = userInfo.bidderOid;
			promis = bidderService.doJoin(joinObj);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					messageService.showMessage(constantService.Danger, data.code);
					return;
				}
				messageService.showMessage(constantService.Success, data.code);
	    		$scope.btnIsVisible = false;
	    		//getAllAuction();
			});
		};
    	
		var getAllAuction = function () {			
			var reqObj = { operation : constantService.GetAllAuction };
        	promis = auctionService.getAuctionList(reqObj);
            promis.then(function (data) {
   		        ngProgress.complete();
    			if (!data.success) {
            		messageService.showMessage(constantService.Danger, data.code);
                    return;
                }
            	
    			angular.forEach(data.data, function(auction, index){
	    			if(auction.status != 'Draft'){
	    				var isJoin = false;
						if(auction.bidderList != null && auction.bidderList.length != 0) {
		    				var keepGoing = true;
			                angular.forEach(auction.bidderList, function(bidder, idx) {
			                    if (keepGoing && bidder.bidderOid == userInfo.bidderOid) {
			                    	auction.doJoin = bidder.status;
			                    	isJoin = true;
			    				    keepGoing = false;
			                    }
			                });
			            }
		    			if(!isJoin){
		    				auction.doJoin = 'yes';
		    			}
		    			$scope.auctions.push(auction);
	    			}
	            });
            	filterAuctions('');
        		createWatches();
            });
        };
        
	 	var init = function () {
			 ngProgress.start();
			 userInfo = authorizationService.getUserInfo();
			 $scope.bidderOid = userInfo.bidderOid;
			 getAllAuction();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('userAuctionListController', ['$rootScope', '$scope', '$websocket', '$modal', '_', '$filter', 'messageService', 'auctionService', 
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 'loadService', 'authorizationService', 'growl', 'bidderService',
    userAuctionListController]);
   
	
});

