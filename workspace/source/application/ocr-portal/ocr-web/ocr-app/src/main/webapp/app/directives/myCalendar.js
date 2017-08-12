'use strict';

define(['app'], function (app) {

    var myCalendar = function () {
    	return {
            require: 'ngModel',
            link: function (scope, el, attr, ngModel) {
            	$(el).mask("00-00-0000");
                $(el).datepicker({
                	dateFormat: 'dd-mm-yyyy' 
                }).on("changeDate", function (ev) {
                	scope.$apply(function () {
                        //ngModel.$setViewValue(moment(ev.date));
                        var x = moment(ev.date).format('DD-MM-YYYY').toString();
                        ngModel.$setViewValue(x);
                    });
                    $(el).datepicker('hide');
                }).on("setDate", function (ev) {
                	console.log(ev);
                });
                $(el).on("keydown", function(event){
                	if(event.which === 9){
                		$(el).datepicker('hide');
                	};
                 }); 
            }
        };
    };

    app.directive('myCalendar', [ myCalendar ]);

});