/**
 * Created by olyjosh on 08/08/2017.
 */
(function () {
    var app;

    function Service($http, API) {

        this.sendChat = function (msg) {
            return $http.get(API + "sendAIMessage?message=" + msg)
        }


    }

    function Ctrl(service) {
        var ctrl = this

        ctrl.chats = []

        ctrl.isPhoneShowing = true
        ctrl.show = function () {
            ctrl.isPhoneShowing = !ctrl.isPhoneShowing
        }

        ctrl.send = function () {
            if (ctrl.msg.length < 1) {
                return
            }

            var msg = ctrl.msg
            ctrl.msg = ""
            addSpeechToChat(msg, true)

            service.sendChat(msg)
                .then(function (res) {
                    var speech = res.data.result.fulfillment.speech
                    addSpeechToChat(speech, false)
                }, function (res) {

                })
        }

        ctrl.rightOrLeft = function (me) {
            if (me == true)return 'right'
            else return 'left'
        }

        function addSpeechToChat(speech, me) {
            ctrl.chats.push({speech: speech, me: me})
        }


    }


    app = angular.module("app", ['ngAnimate']);
    app.controller("Ctrl", Ctrl)
    app.service("service", Service)
    app.constant("API", "/api/v1/")

})();