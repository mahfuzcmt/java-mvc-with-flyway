
'use strict';

define(['app'], function (app) {

    var filterService = function ($rootScope) {
    	
    	this.Text = "text";
    	this.Number = "number";
    	this.Date = "date";
    	
        this.createQuery = function(col, criteria, value, dataType) {
        	if(dataType == this.Text){
        		if(criteria == "STARTS WITH" || criteria == "IS" || criteria == "LIKE"){
        			var query = " and "+col+" LIKE"+ " '"+value+"%' ";
        		}
        	}
			
			return query;       	
        };

    	// filterService Depends on below List
		this.textSearchingCriteriaList = [
			                                {name: "Is", 			value : "IS"}, 				// like
			                                {name: "Is Not", 		value : "IS NOT"}, 			// not like
			                                {name: "Starts with", 	value : "STARTS WITH"}, 	// like 'Ltd%'
			                                {name: "Ends with", 	value : "ENDS WITH"},	 	// like '%Ltd'
			                                {name: "Contains", 		value : "CONTAINS"},		// in()
			                                {name: "Not Contains", 	value : "NOT CONTAINS"}, 	// not in()
			                                {name: "Like", 			value : "LIKE"},			// like
			                                {name: "Is Empty", 		value : "IS NULL"}, 		// is null
			                                {name: "Is Not Empty", 	value : "IS NOT NULL"} 		// is not null
		                               ];
		
		this.numberSearchingCriteriaList = [
			                                {name: "Is", 			value : "IS"}, 				
			                                {name: "Is Not", 		value : "IS NOT"}, 			
			                                {name: "Greater Than", 	value : "GREATER THAN"}, 
			                                {name: "Less Than", 	value : "LESS THAN"}, 
			                                {name: "Between", 		value : "BETWEEN"},
			                                {name: "Is Empty", 		value : "IS NULL"}, 		// is null
			                                {name: "Is Not Empty", 	value : "IS NOT NULL"} 		// is not null
		                               ];
		
		
		
        
    };
    
    app.service('filterService', ['$rootScope',  filterService]);

});
