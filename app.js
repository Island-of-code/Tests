'use strict'
var myApp = angular.module('myApp', ['ngEventAggregator']);

myApp.controller('MainController', ['$scope', 'eventAggregator', function ($scope, eventAggregator) {
    
    
    $scope.onKeyUp = function(event) {

        if (event.key === "ArrowRight") {
            eventAggregator.trigger('arrowRight.happens', { event: event });
        }
        if (event.key === "ArrowLeft") {
            eventAggregator.trigger('arrowLeft.happens', { event: event });
        }
        //console.log(event);
    }

    function MainScreen(drawCtx, eventAggregator) {
        
        var drawCtx = drawCtx;
        var laser = null;
        var eventAggregator = eventAggregator;

        this.addLaser = function() {

            laser = new Laser(drawCtx);
            return laser;
        }

        eventAggregator.on('arrowRight.happens', onArrowRight);
        eventAggregator.on('arrowLeft.happens', onArrowLeft);

        function onArrowRight(data) {
            laser.draw();
        }

        function onArrowLeft(data) {
            laser.draw();
        }

    }

    function Laser(drawCtx) {
        var that = this;
        var drawCtx = drawCtx;
        this.x = 10;
        this.y = 10;

        this.draw = function () {
            drawCtx.beginPath();
            drawCtx.arc(95, 50, 40, 0, 2 * Math.PI);
            drawCtx.stroke();
        }

    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.moveTo(0, 0);
    context.lineTo(200, 100);
    context.stroke();
    $scope.greeting = 'Hola!';

    var mainScreen = new MainScreen(context, eventAggregator);
    mainScreen.addLaser();

}]);