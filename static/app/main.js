(function (angular) {
    //Kreiranje angular aplikacije.
    //Ova aplikacija nema dodatnih zavisnosti.
    var app = angular.module('mainApp', ['ui.router', 'ngFileUpload', 'loginService']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        //Korensko apstraktno stanje, kontejner za ostala stanja.
        $stateProvider.state('app', {
            abstract: true,
            views: {
                //Navbar se prikazuje na svakoj stranici.
                navbar: {
                    templateUrl: 'app/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl',
                    controllerAs: 'nb'
                },
                //Ostale stranice ce se prikazivati u ovom view-u.
                '': {
                    //Potomak korenskog view-a, u njemu se prikazuju ostali template-i.
                    template: '<ui-view name=""></ui-view>'
                }
            }
        })
        //Moglo je i app.home ali bi moralo da se menja
        //referenciranje pomocu ui-sref.
        $stateProvider.state('home', {
            url: '/',
            parent: 'app', //Da se ne bi menjalo referenciranje stanja
            views: {       //u ui-sref ovde se navodi parent.
                '': {
                    templateUrl: 'app/posts/posts.tpl.html',
                    controller: 'postsCtrl',
                    controllerAs: 'lv'
                }
            }
        }).state('post', {
            parent: 'app',
            url: '/posts/{id:int}',
            views: {
                '': {
                    templateUrl: 'app/post/post.tpl.html',
                    controller: 'postCtrl',
                    controllerAs: 'pl'
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
        }).state('makePost', {
            parent: 'app',
            url: '/makePost',
            views: {
                '': {
                    templateUrl: 'app/user_services/makepost.tpl.html',
                    controller: 'UserServiceControl',
                    controllerAs: 'uc'
                }
            }
        }).state('editpost', {
            parent: 'app',
            url: '/editpost',
            views: {
                '': {
                    templateUrl: 'app/post/editpost.tpl.html',
                    controller: 'postCtrl',
                    controllerAs: 'pl'
                }
            }
        }).state('userProfile', {
            parent: 'app',
            url: '/userProfile',
            views: {
                '': {
                    templateUrl: 'app/user-profile/user-profile.tpl.html',
                    controller: 'UserProfileCtrl',
                    controllerAs: 'up'
                }
            }
        });
    }]);
})(angular);