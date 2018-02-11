(function (angular) {
    var app = angular.module('mainApp');
    app.controller('UserServiceControl', ['loginService', '$state', '$http', function ($loginService, $state, $http) {

        //initializers
        var that = this;

        that.loggedinUser = {};

        //containers for editting user
        that.forEditUser = {};

        //user registration containers
        that.passwordcheck = "";
        that.emailCheck = "";

        //new post container and date maker
        that.noviPost = {
            "path": "",
            "author_id": "",
            "likes": "",
            "date": "",
            "tag": "",
            "title": "",
            "info": ""
        };
        that.date = "";

        //new user container
        that.novi = {
            "username": "",
            "password": "",
            "name": "",
            "surname": "",
            "email": ""
        };

        //-----------------------------------Functions for Editting User-------------------------------------------//
        that.prepareUserEdit = function (post) {
            that.forEditUser = angular.copy(that.loggedinUser);
            $location.path('userEdit')
        }

        that.cancelEditUser = function () {
            that.forEditUser = {};
        }

        that.editUser = function () {
            $http.put("/authors/" + that.forEditUser.idUsers, that.forEditUser).then(function (response) {
                that.getAuthors();
                that.forEditUser = {};
                alert("You have successfully changed your information");
                $location.path("/");
            },
                function (reason) {
                    console.log(reason)
                });
        }
        //------------------------------------------------------------------------------//

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
        
        //-----------------------------------Functions for Adding Post-------------------------------------------//
        lv.appendPosts = function () {
            var filename = document.getElementById("Image-select").value;
            lv.noviPost["path"] = "../media/images/" + String(filename);
            lv.noviPost["author_id"] = lv.loggedinUser.idUsers;

            var date = new Date();
            lv.noviPost["date"] = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

            $http.post("/addPost", lv.noviPost).then(function (response) {
                if (response.data["status"] == "done") {
                    alert("You have succesfully created your post")
                    lv.getPosts();
                    $location.path('/');
                }
            },
                function (reason) {
                    console.log(reason);
                });
        }
        //---------------------------------------------------------//

        //-----------------------------------Functions for Registration-------------------------------------------//
        lv.checkAvailability = function () {
            $scope.email = lv.emailCheck;
            for (i = 0; i < lv.authors.length; i++) {
                if (lv.emailCheck == lv.authors[i].Email) {
                    alert("This Email already exists")
                }
                else {
                    lv.appendUser();
                }
            }
        }

        lv.appendUser = function () {
            $http.post("/addAuthor", lv.novi).then(function (response) {
                if (response.data["status"] == "done") {
                    lv.getAuthors();
                    alert("You have succesfully registered")
                    $location.path("/");
                }
            },
                function (reason) {
                    console.log(reason);
                });
        }

        lv.passwordMatch = function () {
            if (lv.novi.password != lv.passwordcheck) {
                return false;
            }
            else {
                return true;
            }
        }
        //----------------------------------------------------------------//

        //---------------------Function for Reutrning Logged In------------------------------//
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
        //--------------------------------------------//

        loginService.isLoggedin(function () {
            that.fetchArticle();
        },
            function () {
                $state.go('login');
            });

    }]);

})(angular);