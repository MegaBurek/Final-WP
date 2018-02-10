(function (angular) {
    var app = angular.module('mainApp');
    app.controller('postsCtrl', ['$http', '$state', function($http, $state) {
    
        //initializers
        var lv = this;
        lv.posts = [];//all posts are saved here

        //containers for editting
        lv.post = {};
        lv.forEdit = {};

        //container for showing buttons
        lv.loggedinUser = {};

        //tags
        lv.tags = ["", "space", "flower", "car", "landscape"];

        //container for filter
        lv.selectTag = '';

        //-----------------------------------Function for Loading Posts--------------------//
        lv.getPosts = function() {
            $http.get('/getPosts').then(
                function(response) {
                    lv.posts = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }
        //------------------------------------------//

        //-----------------------------------Functions for Editting Post--------------------//
        lv.getPost = function (id) {
            $http.get("/posts/" + id).then(function (response) {
                lv.post = response.data;
                $state.go('editpost');
                lv.prepareEdit(lv.post);
            },
                function (reason) {
                    console.log(reason)
                });
        };

        lv.prepareEdit = function (post) {
            lv.forEdit = angular.copy(post);
            console.log(lv.forEdit)
        }

        lv.cancelEdit = function () {
            lv.forEdit = {};
        }

        lv.editPost = function () {
            $http.put("/posts/" + lv.forEdit.idPosts, lv.forEdit).then(function (response) {
                lv.forEdit = {};
                alert("You have successfully changed your post");
                $state.go('home');
            },
                function (reason) {
                    console.log(reason)
                });
        }
        //-------------------------------------------------------//

        //-----------Function for removing post-----------//
        lv.remove = function (id) {
            $http.delete("/posts/" + id).then(function (response) {
                alert("You have succesfully removed your post")
                lv.getPosts();
            },
                function (reason) {
                    console.log(reason)
                });
        };
        //----------------------//

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

        //-----------Function for showing buttons on posts-----------//
        lv.checkPrivlage = function (id) {
            lv.returnUser();
            if (id == lv.loggedinUser.idUsers) {
                return true;
            }
            else {
                return false
            }
        };
        //-----------------------------//


        lv.getPosts();

    }]);
})(angular);