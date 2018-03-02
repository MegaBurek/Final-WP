(function (angular) {
    var app = angular.module('mainApp');
    app.controller('LoginCtrl', ['loginService', '$state', '$http', function (loginService, $state, $http) {
        var that = this;
        that.failed = false;
        that.loggedIn = false;
        that.user = {
            'username': '',
            'password': ''
        }
        that.loggedInUser = {};

        that.getUser = function () {
            $http.get('/returnLogged').then(
                function (response) {
                    that.loggedInUser = response.data;
                },
                function (reason) {
                    console.log(reason);
                }
            );
        }

        that.logout = function () {
            $http.get('/logout').then(
                function (response) {
                    that.loggedIn = false
                    alert("You have succesfully logged out")
                    $state.go('home')
                },
                function (reason) {
                    console.log(reason);
                }
            );

        }

        that.login = function () {
            loginService.login(that.user, function () {
                that.loggedIn = true;
                $state.go('home');
                console.log(that.loggedIn);
            },
                function () {
                    that.failed = true;
                    alert("Username and password do not match")
                }
            )
        }

        that.logStatus = function () {
            $http.get('/isLoggedin').then(function (response) {
                if (response.data == true) {
                    that.loggedIn = true;
                } else {
                    that.loggedIn = false;
                }
            },
                function (reason) {
                    console.log(reason);
                }
            );
        }

        that.showlog = function() {
            console.log(that.loggedIn);
        }

    }]);
})(angular);