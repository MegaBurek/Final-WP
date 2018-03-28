(function (angular) {
    var app = angular.module('mainApp');
    app.controller('adminControl', ['$state', '$http', function ($state, $http) {

        //initializers
        var that = this;

        that.authors = [];

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