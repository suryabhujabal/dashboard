var app = angular.module("app",[]);

app.controller("widgetCtrl",['$scope','dashboardServices',function($scope,dashboardServices){
    $scope.activeWidget='Total Orders';


    $scope.widgets=dashboardServices.getWidgets()

    $scope.showWidget= function(widget){
        $scope.activeWidget=widget;
        $scope.widgetDetails=dashboardServices.getWidgetdetails(widget.widgetId);
    };

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
                "widgetValue": "23"
            }, {
                "widgetId": "12121",
                "widgetName": "Total Orders",
                "widgetPriority": "1",
                "widgetIcon": "orders.ico",
                "widgetValue": "119"
            }, {
                "widgetId": "12123",
                "widgetName": "Unassigned Orders",
                "widgetPriority": "3",
                "widgetIcon": "orders.ico",
                "widgetValue": "115"
            }, {
                "widgetId": "12124",
                "widgetName": "Take Action",
                "widgetPriority": "4",
                "widgetIcon": "exception.ico",
                "widgetValue": "23"
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