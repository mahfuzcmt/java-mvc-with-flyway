'use strict';

define(['app'], function (app) {

    var richtexteditor = function () {
    	return {
    		restrict : "A",
            replace : true,
            transclude : true,
    		scope: { },
            template: "<div><textarea id=\"richtexteditor-content\" style=\"height:300px;width:100%\"></textarea></div>",
            link : function( $scope, $element, $attrs ) {
    				$scope.editor = $('#richtexteditor-content').wysihtml5();
    				$scope.editor = new wysihtml5.Editor( "richtexteditor-content", {
    					toolbar : "richtexteditor-toolbar",
    					parserRules: wysihtml5ParserRules       
    			});
        
    			$scope.$parent.$watch( $attrs.content, function( newValue, oldValue ) {
    				$scope.editor.innerHTML = newValue;
    				$scope.editor.composer.setValue( newValue );
    			});
        
		        $scope.cancel = function() {
		        	$scope.$parent.cancel();
		        }
		        /*
		        $scope.save = function() {
		                var currentTemplateContent = $encryption.encodeHtml( $scope.editor.getValue() );
		                $scope.$parent.currentTemplate.content = currentTemplateContent;
		                $scope.$parent.save();
		        }
		        */
		        $scope.isClean = function() {
		        	$scope.$parent.isClean();
		        }
            }
    	};
    };

    app.directive('richtexteditor', [richtexteditor]);

});