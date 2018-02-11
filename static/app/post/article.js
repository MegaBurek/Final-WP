(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ArticleCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.article = {}
        that.fetchArticle = function() {
            $http.get('articles/'+$stateParams.id).then(
                function(response) {
                    that.article = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        loginService.isLoggedIn(function() {
            that.fetchArticle();
        },
        function() {
            $state.go('login');
        });
        
    }]);
})(angular);