(function (angular) {
    var app = angular.module('mainApp');
    app.controller('postsCtrl', ['loginService', '$state', '$http',  function(loginService, $state, $http) {
    
        //initializers
        var that = this;
        that.posts = [];//all posts are saved here

        //container for showing buttons
        that.loggedinUser = {};

        //tags
        that.tags = ["", "space", "flower", "car", "landscape"];

        //container for filter
        that.selectTag = '';

        //-----------------------------------Function for Loading Posts--------------------//
        that.getPosts = function() {
            $http.get('/getPosts').then(
                function(response) {
                    that.posts = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }
        //------------------------------------------//

        //-----------Function for removing post-----------//
        that.remove = function (id) {
            $http.delete("/posts/" + id).then(function (response) {
                alert("You have succesfully removed your post")
                that.getPosts();
            },
                function (reason) {
                    console.log(reason)
                });
        };
        //----------------------//

        //-----------Function for returning logged in-----------//
        that.returnUser = function() {
            $http.get('/returnLogged').then(
                function(response) {
                    that.loggedInUser = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }
        //-----------------------------//

        //-----------Function for showing buttons on posts-----------//
        that.checkPrivlage = function (id) {
            if (id == that.loggedinUser.idUsers) {
                return true;
            }
            else {
                return false
            }
        };
        //-----------------------------//

        loginService.isLoggedIn(function() {
            $state.go('home');
        },
        function() {
            that.loggedinUser = {};
        });

        that.returnUser();
        that.getPosts();

    }]);
})(angular);