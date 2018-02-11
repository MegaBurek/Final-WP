(function (angular) {

    var app = angular.module('mainApp', ['ui.router', 'ngFileUpload', 'loginService']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('app', {
            abstract: true,
            views: {
                navbar: {
                    templateUrl: 'app/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl',
                    controllerAs: 'nb'
                },
                '': {
                    template: '<ui-view name=""></ui-view>'
                }
            }
        })
        $stateProvider.state('home', {
            url: '/',
            parent: 'app',
            views: {
                '': {
                    templateUrl: 'app/posts/posts.tpl.html',
                    controller: 'postsCtrl',
                    controllerAs: 'lv'
                }
            }
        }).state('login', {
            parent: 'app',
            url: '/login',
            views: {
                '': {
                    templateUrl: 'app/login/login.tpl.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'lc'
                }
            }
        }).state('signup', {
            parent: 'app',
            url: '/addAuthor',
            views: {
                '': {
                    templateUrl: 'app/user_services/register.tpl.html',
                    controller: 'regCtrl',
                    controllerAs: 'rc'
                }
            }
        }).state('edituser', {
            parent: 'app',
            url: '/authors/{idUser}',
            views: {
                '': {
                    templateUrl: 'app/user_services/edituser.tpl.html',
                    controller: 'UserServiceControl',
                    controllerAs: 'lv'
                }
            }
        }).state('addpost', {
            parent: 'app',
            url: '/addPost',
            views: {
                '': {
                    templateUrl: 'app/user_services/makepost.tpl.html',
                    controller: 'UserServiceControl',
                    controllerAs: 'lv'
                }
            }
        }).state('viewpost',{
            parent: 'app',
            url: '/post/{idPost}',
            views: {
                '': {
                    templateUrl: 'app/post/post.tpl.html',
                    controller: 'ArticleCtrl',
                    controllerAs: 'ar'
                }
            }
        }).state('editpost',{
            parent: 'app',
            url: '/posts/{idPost}',
            views: {
                '': {
                    templateUrl: 'app/post/post.tpl.html',
                    controller: 'ArticleCtrl',
                    controllerAs: 'ar'
                }
            }
        }).state('viewprofile',{
            parent: 'app',
            url: '/profile',
            views: {
                '': {
                    templateUrl: 'app/profile/profile.tpl.html',
                    controller: 'profileCtrl',
                    controllerAs: 'pc'
                }
            }
        })
    }]);
})(angular);