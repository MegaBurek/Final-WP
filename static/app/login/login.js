(function (angular) {
    var app = angular.module('mainApp');
    app.controller('LoginCtrl', ['loginService', '$state', '$http',  function(loginService, $state, $http) {
        var that = this;

        that.loggedin = false;
        that.failed = false;
        that.user = {
            'username': '',
            'password': ''
        }

        that.login = function() {
            loginService.login(that.user, function() {
                alert("You have succesfully logged in")
                $state.go('home');
            },
            function() {
                that.failed = true;
            })
        }

        that.logout = function() {
            loginService.logout(function () {
                alert("You have succesfully logged out")
                $state.go('home');
            },
            function() {
                that.loggedin = false;
            })
        }

        loginService.isLoggedIn(function() {
            $state.go('home');
        },
        function() {
            that.loggedin = true;
        });

    }]);

})(angular);