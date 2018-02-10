(function(angular) {

    var app = angular.module('mainApp', ['ui.router', 'loginService']);

    app.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: 'home',
            url: '',
            templateUrl: 'app/posts/posts.tpl.html',
            controller: 'postsCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'login',
            url: '/login',
            templateUrl: 'app/login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'signup',
            url: '/addAuthor',
            templateUrl: 'app/user_services/register.tpl.html',
            controller: 'UserServiceControl',
            controllerAs: 'lv'
        }).state({
            name: 'edituser',
            url: '/authors/{idUser}',
            templateUrl: 'app/user_services/edituser.tpl.html',
            controller: 'UserServiceControl',
            controllerAs: 'lv'
        }).state({
            name: 'addpost',
            url: '/addPost',
            templateUrl: 'app/user_services/makepost.tpl.html',
            controller: 'UserServiceControl',
            controllerAs: 'lv'
        }).state({
            name: 'showpost',
            url: '/posts/{idPost}',
            templateUrl: 'app/home/post.tpl.html',
            controller: 'HomeControl',
            controllerAs: 'lv'
        }).state({
            name: 'editpost',
            url: '/posts/{idPost}',
            templateUrl: 'app/home/editpost.tpl.html',
            controller: 'HomeControl',
            controllerAs: 'lv'
        }).state({
            name: 'viewprofile',
            url: '/posts/{idPost}',
            templateUrl: 'app/home/editpost.tpl.html',
            controller: 'HomeControl',
            controllerAs: 'lv'
        })
    }]);
})(angular);