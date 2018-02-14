(function (angular) {
    var app = angular.module('mainApp');
    app.controller('LoginCtrl', ['loginService', '$state', '$http',  function(loginService, $state, $http) {
        var that = this;

        that.loggedin = false;
        that.failed = false;
        that.showLogin = false;
        that.user = {
            'username': '',
            'password': ''
        }

        that.login = function() {
            loginService.login(that.user, function() {
                that.loggedIn = true;
                $state.go('home');
                location.reload();
            },
            function() {
                alert("Username or password don't exist")
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
            if ($state.includes('login') || $state.includes('signup')) {
                $state.go('home');
            }
        },
        function() {
            that.showLogin = true;
        });

    }]);

})(angular);