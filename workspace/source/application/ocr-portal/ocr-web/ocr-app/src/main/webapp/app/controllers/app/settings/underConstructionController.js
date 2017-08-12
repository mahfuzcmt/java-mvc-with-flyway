'use strict';

define(['app'], function (app) {
	
	var underConstructionController = function ($scope, ngProgress) {
		
		$scope.model = {
			'companyName':'Techno Innovators',
			'companyAddress':'Bangladesh',
			'orderNo':'# PO-00003',
			'vendorName':'Sharafat',
			'deliverdBy':'Kamruzzaman Tanim',
			'deliverdByAddress':'Bangladesh',
			'date' : '2017-01-13T14:15:27.146Z',
			'deliveryDate' : '2017-01-13T14:15:27.146Z',
			'refNo':'# PO-00003',
			'status':'Draft',
			'subTotal':2000,
			'total':2000,
			'refNo':'# PO-00003',
			'details':[
				{'itemName':'Fish', 'unit':'Kg', 'qty': 5, 'rate': 200, 'amount' : 1000},
				{'itemName':'Fish', 'unit':'Kg', 'qty': 5, 'rate': 200, 'amount' : 1000}
			]
		};

		$scope.doPrint = function () {
			 window.print();
	 	};
		
		var init = function () {
			 ngProgress.start();
		     ngProgress.complete();
	 	};

	 	init();
	 	
	};
	 
    app.register.controller('underConstructionController', ['$scope', 'ngProgress', underConstructionController]);
    
});

