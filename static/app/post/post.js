(function (angular) {
    var app = angular.module('mainApp');
    app.controller('postCtrl', ['$http', '$state', '$stateParams', 'loginService', function ($http, $state, $stateParams, loginService) {
        var that = this;

        that.post = {};
        that.forEdit = {};
        that.loggedInUser = {};

        that.fetchArticle = function () {
            $http.get('posts/' + $stateParams.id).then(
                function (response) {
                    that.post = response.data;
                },
                function (reason) {
                    console.log(reason);
                }
            );
        }

        loginService.isLoggedIn(function () {
            that.fetchArticle();
        },
            function () {
                $state.go('login');
            });


        loginService.getLoggedIn(function (user) {
            that.loggedInUser = user;
        },
            function (errorReason) {
                console.log(errorReason);
            })

        that.checkPrivlage = function () {
            if (that.post.Users_idUsers == that.loggedInUser.idUsers) {
                return true;
            }
            else {
                return false;
            }
        }

        //-----------------------------------Functions for Editting Post--------------------//
        that.callforEdit = function () {
            if (that.checkPrivlage()) {
                that.prepareEdit();
                $state.go('editpost');
                console.log(that.forEdit.idPosts)
            }
            else {
                alert("You cannot edit someone else's post");
            }
        };

        that.prepareEdit = function () {
            that.forEdit = angular.copy(that.post);
            console.log(that.forEdit);
        }

        that.cancelEdit = function () {
            that.forEdit = {};
            $state.go("home");
        }

        that.editPost = function () {
            console.log(that.forEdit.idPosts);
            $http.put("/posts/" + that.forEdit.idPosts, that.forEdit).then(function (response) {
                that.forEdit = {};
                alert("You have successfully changed your post");
                $state.go('home');
            },
                function (reason) {
                    console.log(reason)
                });
        }
        //-------------------------------------------------------//

        //-----------Function for removing post-----------//
        that.confirmRemove = function(){
            var r = confirm("Are you you want to remove your post?");
            if (r == true) {
                return true;
            } else {
                return false;
            }
        };

        that.remove = function (id) {
            if (that.checkPrivlage()) {
                if(that.confirmRemove()){
                $http.delete("/posts/" + id).then(function (response) {
                    alert("You have succesfully removed your post")
                    $state.go('home')
                },
                    function (reason) {
                        console.log(reason)
                    });
                }
            }
            else {
                alert("You cannot remove someone else's post");
            }
        };
        //----------------------//

    }]);
})(angular);