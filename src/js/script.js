var app = angular.module("app",["ngRoute"]);

app.config(
    function( $controllerProvider, $provide, $compileProvider ) {
        console.log( "Config method executed." );
        app._controller = app.controller;

        app.controller = function( name, constructor ) {
            $controllerProvider.register( name, constructor );
            return( this );
        };
    }
);

app.controller("widgetCtrl",['$scope','dashboardServices','$templateCache',function($scope,dashboardServices,$templateCache){
    $scope.activeWidget='Total Orders';

    $scope.widgets=dashboardServices.getWidgets();
    $scope.cntrlName = 'widget controller';
    $scope.loadTemplate = function(widget) {
        var container = $('.widget-preview');
        // var templateText='<div ng-controller="TempCtrl"> <h2>About</h2> <h3>{{total}}</h3> <p>Testing the total</p> <button ng-click="update()">Update</button> </div> <script> console.log("begin"); console.log(app.controller); app.controller("TempCtrl", function ($scope) { $scope.total = 0; console.log("inside"); $scope.update = function () { $scope.total = $scope.total + 1; }; }); console.log("end") <\/script>';
        container.html($templateCache.get(widget.template));
        var newScope = angular.element(container).scope();
        var compile = angular.element(container).injector().get('$compile');
        compile($(container).contents())(newScope);
    }
    $scope.showWidget= function(widget){
        console.log(widget.widgetName +" "+ widget.template);

    };
}]);
app.controller("totalOrdersCtrl",['$scope','dashboardServices',function($scope,dashboardServices){
    $scope.cntrlName = 'Total Orders controller';
}]);
app.controller("exceptionsCtrl",['$scope','dashboardServices',function($scope,dashboardServices){
    $scope.cntrlName = 'Exceptions controller';
}]);


app.directive("dashboardPreview",function(){
    return {
        templateUrl : 'templates/template_basic_chart.tpl.html',
        restrict : 'E',
        scope: {
            activeWidget: '=',
            widgetDetails :  '='
        },
        controller : function($scope){


            
        }
    }
});


app.factory("dashboardServices",function(){
    var services= {
        getWidgets: function () {
            var widgetData = [{
                "widgetId": "12122",
                "widgetName": "Orders with Exception",
                "widgetPriority": "2",
                "widgetIcon": "exception.ico",
                "widgetValue": "23",
                "template":"orders-with-exception.tpl.html",
                "widgetPath": "/exceptions"
            }, {
                "widgetId": "12121",
                "widgetName": "Total Orders",
                "widgetPriority": "1",
                "widgetIcon": "orders.ico",
                "widgetValue": "119",
                "template":"total-orders.tpl.html",
                "widgetPath": "/totalOrders"
            }, {
                "widgetId": "12123",
                "widgetName": "Orders Due",
                "widgetPriority": "3",
                "widgetIcon": "orders.ico",
                "widgetValue": "115",
                "template":"orders-due.tpl.html",
                "widgetPath": "/unassigned"
            }, {
                "widgetId": "12124",
                "widgetName": "Pending Items",
                "widgetPriority": "4",
                "widgetIcon": "exception.ico",
                "widgetValue": "23",
                "template":"pending-items.tpl.html",
                "widgetPath": "/takeAction"
            }];

            return widgetData;

        },
        getWidgetdetails: function () {
            var widgetDetails = {
                "widgetId": "12121",
                "views": [{
                    "viewName": "",
                    "type": "pie-chart",
                    "template_id": "123",
                    "keyLabel": "order Status",
                    "valueLabel": "status Count",
                    "model": [{
                        "key": "Released",
                        "value": "40"
                    }, {
                        "key": "Pick Complete",
                        "value": "100"
                    }, {
                        "key": "Pick Review",
                        "value": "170"
                    }]
                }]
            }
            return widgetDetails;
        }
    }
    return services;
});


