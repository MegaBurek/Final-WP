(function (angular) {
    var app = angular.module('mainApp');
    app.controller('UserServiceControl', ['loginService', '$state', '$http', function ($loginService, $state, $http) {

        //initializers
        var that = this;

        //user registration containers
        that.passwordcheck = "";
        that.emailCheck = "";
        
        //new user container
        that.novi = {
            "username": "",
            "password": "",
            "name": "",
            "surname": "",
            "email": ""
        };

        //-----------------------------------Functions for Registration-------------------------------------------//
        that.checkAvailability = function () {
            $scope.email = that.emailCheck;
            for (i = 0; i < that.authors.length; i++) {
                if (that.emailCheck == that.authors[i].Email) {
                    alert("This Email already exists")
                }
                else {
                    that.appendUser();
                }
            }
        }

        that.appendUser = function () {
            $http.post("/addAuthor", that.novi).then(function (response) {
                if (response.data["status"] == "done") {
                    alert("You have succesfully registered")
                    $state.go('home')
                }
            },
                function (reason) {
                    console.log(reason);
                });
        }

        that.passwordMatch = function () {
            if (that.novi.password != that.passwordcheck) {
                return false;
            }
            else {
                return true;
            }
        }
        //----------------------------------------------------------------//

        loginService.isLoggedin(function () {
            that.checkAvailability();
        },
            function () {
                $state.go('login');
            });

    }]);

})(angular);