'use strict';

define(['app'], function (app) {
	
	var orgdashboardController = function ($rootScope, $scope, _, messageService, dashboardService, constantService, 
		navigationService, localStorageService,authorizationService, configurationService, ngProgress, loadService, 
		companyService, employeeService,growl) {
		 
		var promis;
		$scope.pageItem = {
			size15: 15,
			size30: 30,
			size60: 60,
			size100: 100
		};
		$scope.displayedCollection = [];
		$scope.currentPage = 1;
		$scope.pageDataBegin = 0;
		$scope.pageDataEnd = 0;
		$scope.pageDataTotal = 0;
		$scope.pageItemText = "";
		$scope.maxPaginationSize = 5;
		$scope.PreItemsPerPage;
		$scope.itemsPerPage = 15;
		$scope.size15 = true;
		var dashboard = { receivableProgress : { ledgerName : '', currentReceivable : 0, overdue : 0, total : 0, progress : 0 },
			payableProgress : { ledgerName : '', currentPayable : 0, overdue : 0 ,total : 0, progress : 0 }, 
			cashFlows : [],
			cashFlowByFP : { openingBalance : 0, incoming : 0, outgoing : 0, ledgerBalance :0 }
		};
		
		var loadDashboardData = function() {
			ngProgress.start();
			var obj = { operation : constantService.DashboardData};
			obj.loginBean = authorizationService.getUserInfo();
			promis = dashboardService.getGroupDashboardData(obj);
			promis.then(function (responseData) {
			    ngProgress.complete();	   		
	   			if (!responseData.success) {
	   				growl.error("Unable to load dashboard", {ttl: 3000});
	                return;
	   			}
				$scope.dashboard = angular.copy(responseData.data);
	   			if(!angular.isUndefinedOrNull(responseData.data.payableProgress)){
	   				$scope.dashboard.payableProgress.progress = ($scope.dashboard.payableProgress.currentPayable/$scope.dashboard.payableProgress.total)*100;
	   			} else {
	   				$scope.dashboard.payableProgress = dashboard.payableProgress;
	   			}
	
	   			if(!angular.isUndefinedOrNull(responseData.data.receivableProgress)){
	   				$scope.dashboard.receivableProgress.progress = ($scope.dashboard.receivableProgress.currentReceivable/$scope.dashboard.receivableProgress.total)*100;
	   			} else {
	   				$scope.dashboard.receivableProgress = dashboard.receivableProgress;
	   			}
	   			$scope.rowCollection = $scope.dashboard.bankAccounts;
				$scope.totalData = $scope.rowCollection.length;
				createWatches($scope.dashboard.bankAccounts);
	   			var category = [], incoming = [], outgoing = [];
	   			angular.forEach($scope.dashboard.cashFlows, function(cashFlow, index){
	   				category.push(cashFlow.month);
	   				incoming.push(cashFlow.incoming);
	   				outgoing.push(cashFlow.outgoing);
	   			});
	   			showChart(category, incoming, outgoing);
	   			
	   			/*if(responseData.data.receivableProgress != null && responseData.data.payableProgress != null) {
	   				$scope.dashboard = angular.copy(responseData.data);
		   			$scope.dashboard.receivableProgress.progress = ($scope.dashboard.receivableProgress.currentReceivable/$scope.dashboard.receivableProgress.total)*100;
		   			$scope.dashboard.payableProgress.progress = ($scope.dashboard.payableProgress.currentPayable/$scope.dashboard.payableProgress.total)*100;
		   			var category = [], incoming = [], outgoing = [];
		   			angular.forEach($scope.dashboard.cashFlows, function(cashFlow, index){
		   				category.push(cashFlow.month);
		   				incoming.push(cashFlow.incoming);
		   				outgoing.push(cashFlow.outgoing);
		   			});
		   			showChart(category, incoming, outgoing);
				}*/
		   					
			});
		};
		
		var showChart = function(category, incoming, outgoing){
			$scope.columnChartConfig = {
				options: {
		            chart: {
		            	type: 'spline'
		            },
		            title: {
		            	text: ''
		            },
			        subtitle: {
			        	text: ''
			        },
			        xAxis: {
			        	categories: category
			        },
			        yAxis: {
			        	title: {
			                text: ''
			            },
			            labels: {
			                formatter: function () {
			                    return this.value;
			                }
			            }
			        },
			        tooltip: {
			        	headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			        	spline: {
			                marker: {
			                    radius: 4,
			                    lineColor: '#666666',
			                    lineWidth: 1
			                }
			            }
			        },
			        credits: {
			            enabled: false
			        },
			        exporting : {
			        	enabled : true
			        }
				},
				series: [{
		            name: 'Incoming',
		            color:'#66a822',
		            marker: {
		                symbol: 'square'
		               
		            },
		            data: incoming

		        }, {
		            name: 'Outgoing',
		            color:'#ef6f08',
		            marker: {
		                symbol: 'diamond'
		            },
		            data: outgoing
		        }],
				loading: false
			};
		};
		 
		var doPagination = function (filteredResult) {
			$scope.rowCollection = filteredResult;
			$scope.pageDataTotal = filteredResult.length;
			if ($scope.pageDataTotal == 0) {
				$scope.pageDataBegin = 0;
				$scope.pageDataEnd = 0;
			} else {
				$scope.pageDataBegin = (($scope.currentPage - 1) * $scope.itemsPerPage) + 1;
				$scope.pageDataEnd = $scope.pageDataBegin + $scope.itemsPerPage - 1;
			}

			if ($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
				$scope.pageDataEnd = $scope.pageDataTotal
			}

			$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd,
				$scope.pageDataTotal, "Banks", 'English');
		};
		
		var createWatches = function (data) {
			$scope.$watch("searchText", function (filterText) {
				$scope.currentPage = 1;
			});
			$scope.$watch('currentPage + itemsPerPage', function () {
				var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
					end = begin + ($scope.itemsPerPage - 0);
				$scope.rowCollection = data.slice(begin, end);
				$scope.pageDataTotal = $scope.totalData;

				if ($scope.pageDataTotal == 0) {
					$scope.pageDataBegin = 0;
					$scope.pageDataEnd = 0;
				} else {
					$scope.pageDataBegin = begin + 1;
					$scope.pageDataEnd = end;
				}
				if ($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
					$scope.pageDataEnd = $scope.pageDataTotal
				}
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd,
					$scope.pageDataTotal, "Banks", "English");
			});
		};
		
	 	var init = function () {
			 $scope.dashboard = angular.copy(dashboard);
			 loadDashboardData();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('orgdashboardController', ['$rootScope', '$scope', '_', 'messageService', 'dashboardService', 
    'constantService', 'navigationService', 'localStorageService','authorizationService','configurationService', 
    'ngProgress', 'loadService', 'companyService', 'employeeService','growl', orgdashboardController]);
	
});

