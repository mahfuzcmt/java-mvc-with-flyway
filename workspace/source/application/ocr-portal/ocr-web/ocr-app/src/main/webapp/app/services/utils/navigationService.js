'use strict';

define(['app','services/utils/navigationService'], function (app) {

    var navigationService = function ($location, $anchorScroll) {
    	
    	this.goToTop = function(){
    		$location.hash("");
    		$anchorScroll();
    	};
    	
		this.menuNavigation = function (navUrl) { 
			$location.path('/'+navUrl); 
		};
		
		this.showPage = function (url) {
	    	$location.path('/'+url);
	    };
		
		this.showPageWithData = function (url, id) {
	    	$location.path('/'+url+'/'+id);
	    };
	    
	    this.showPageWithTwoParams = function (param1, param2) {
	    	$location.path('/'+param1+'/'+param2);
	    };
	    
	    this.redirectWithThreeParams = function (param1, param2, param3) {
	    	$location.path('/'+param1+'/'+param2+'/'+param3);
	    };
    	
    };
    
    app.service('navigationService', ['$location', '$anchorScroll', navigationService]);

});
