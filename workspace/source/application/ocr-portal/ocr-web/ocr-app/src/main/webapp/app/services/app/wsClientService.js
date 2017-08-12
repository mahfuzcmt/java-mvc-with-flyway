
'use strict';

define(['app'], function (app) {

	var wsClientService = function ($rootScope,$websocket,$resource, $q, $cookieStore, constantService, configurationService) {
		
		var ws;
		var service = {};
  	  	service.connect = function() {
  		  	
  		    /*ws = new WebSocket(configurationService.wsDashboard);*/
  	  		
  	  	  ws = $websocket.$new(configurationService.wsDashboard);
  		    
  	  	   ws.$on('$open', function() {
  	        console.log('wow its working');

  	        ws.$emit('message', 'some message');

  	      });
  	  	   
	  	  	ws.$on('$message', function (response) {
	            console.log("DATA FROM SERVER", response);
	  	    }); 
	  	  	
	  	   ws.$on('$close', function(data) {
	          console.log('wss closed');
	        });
  		  /*  ws.onopen = function() {
  		    	service.callback("connected");
  		    };
  		    ws.onclose = function(evt){
  			    service.callback("close");
  		    }
  		    ws.onerror = function() {
  		    	service.callback("disconnected");
  		    }
  		    ws.onmessage = function(message) {
  		    	service.callback(message.data);
  		    };*/
  		    service.ws = ws;
  		};
  	 
		service.send = function(message) {
			service.ws.send(message);
		};
	  	 
	  	service.subscribe = function(callback) {
	  		service.callback = callback;
	  	};
	  	 
	  	service.close = function() {
	  		ws.close();
	  	};
  	 
	  	return service; 
	
    };
    
    app.service('wsClientService', ['$rootScope','$websocket','$resource', '$q', '$cookieStore', 'constantService', 
           'configurationService', wsClientService]);

});

