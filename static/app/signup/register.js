(function (angular) {
    var app = angular.module('mainApp');
    app.controller('regControl', ['$state', '$http', function ($loginService, $state, $http) {

        //initializers
        var that = this;

        //user registration containers
        that.passwordcheck = "";
        that.emailCheck ="";
        that.authors = [];
        
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
            for (i = 0; i < that.authors.length; i++) {
                if (that.emailCheck == that.authors[i].Email) {
                    alert("This Email has already been registered")
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
                    $state.go('login')
                    alert("Please try login with your new account")
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

        that.getAuthors = function () {
            $http.get("/getAuthors").then(function (response) {
                that.authors = response.data;
            }, function (reason) {
                console.log(reason);
            });
        }

        that.getAuthors();

    }]);

})(angular);