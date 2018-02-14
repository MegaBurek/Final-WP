(function(angular) {
    //Kreiranje angular aplikacije.
    //Ova aplikacija nema dodatnih zavisnosti.
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
            controllerAs: 'lc'
        }).state({
            name: 'signup',
            url: '/signup',
            templateUrl: 'app/login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
        })
    }]);
})(angular);