(function (angular) {
    var app = angular.module('mainApp');
    app.controller('postcreateCtrl', ['loginService', '$state', '$scope', function(loginService, $state, $scope) {
        //initializers
        var that = this;

        that.loggedinUser = {};

        //containers for editting user
        that.forEditUser = {};

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

        //-----------------------------------Functions for Adding Post-------------------------------------------//
        that.appendPosts = function () {
            var filename = document.getElementById("Image-select").value;
            that.noviPost["path"] = "../media/images/" + String(filename);
            that.noviPost["author_id"] = that.loggedinUser.idUsers;

            var date = new Date();
            that.noviPost["date"] = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

            $http.post("/addPost", that.noviPost).then(function (response) {
                if (response.data["status"] == "done") {
                    alert("You have succesfully created your post")
                    $state.go('home');
                }
            },
                function (reason) {
                    console.log(reason);
                });
        }
        //---------------------------------------------------------//

        loginService.getLoggedIn(function (user) {
            that.loggedInUser = user;
        },
            function (errorReason) {
                console.log(errorReason);
            })

    }]);

})(angular);