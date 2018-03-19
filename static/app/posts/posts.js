(function (angular) {
    var app = angular.module('mainApp');
    app.controller('postsCtrl', ['loginService', '$state', '$http', function (loginService, $state, $http) {

        //initializers
        var that = this;
        that.posts = [];//all posts are saved here

        //-----------------------------------Function for Loading Posts--------------------//
        that.getPosts = function () {
            $http.get('/getPosts').then(
                function (response) {
                    that.posts = response.data;
                },
                function (reason) {
                    console.log(reason);
                }
            );
        }
        //------------------------------------------//

        that.getPosts();

    }]);
})(angular);