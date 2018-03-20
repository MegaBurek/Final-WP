(function (angular) {
    var app = angular.module('mainApp');
    app.controller('regControl', ['$state', '$http', function ($state, $http) {

        //initializers
        var that = this;

        that.authors = [];

        //user registration containers
        that.passwordcheck = "";
        
        //new user container
        that.novi = {
            "username": "",
            "password": "",
            "name": "",
            "surname": "",
            "email": "",
            "type": "User"
        };

        //-----------------------------------Functions for Registration-------------------------------------------//
        that.checkAvailability = function () {
            for (i = 0; i < that.authors.length; i++) {
                if (that.novi.email == that.authors[i].Email || that.novi.username == that.authors[i].Username) {
                    alert("This user has already been registered")
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