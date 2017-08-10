/**
 * Created by olyjosh on 08/08/2017.
 */
(function() {
    var app;

    function Ctrl(){
        var ctrl = this

        ctrl.isPhoneShowing = true
        ctrl.show = function () {
            ctrl.isPhoneShowing = !ctrl.isPhoneShowing
        }
    }


    app = angular.module("app", ['ngAnimate']);
    app.controller("Ctrl", Ctrl);

})();