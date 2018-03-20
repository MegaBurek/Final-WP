(function (angular) {
    var app = angular.module('mainApp');
    app.controller('UserProfileCtrl', ['loginService', '$state','$http', function(loginService, $state, $http) {

        //initializers
        var that = this;

        that.loggedInUser = {};

        //containers for editting user
        that.forEditUser = {};
        that.enableEdit = false;

        //-----------------------------------Functions for Editting User-------------------------------------------//
        that.prepareUserEdit = function (post) {
            that.forEditUser = angular.copy(that.loggedInUser);
            that.enableEdit = true;
        }

        that.cancelEditUser = function () {
            that.forEditUser = {};
            that.enableEdit = false;
            $state.go("home");
        }

        that.editUser = function () {
            $http.put("/authors/" + that.forEditUser.idUsers, that.forEditUser).then(function (response) {
                that.forEditUser = {};
                alert("You have successfully changed your information");
                $state.go('home');
            },
                function (reason) {
                    console.log(reason)
                });
        }

        //------------------------------------------------------------------------------//

        loginService.getLoggedIn(function (user) {
            that.loggedInUser = user;
        },
            function (errorReason) {
                console.log(errorReason);
            })

    }]);

})(angular);