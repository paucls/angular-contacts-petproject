'use strict';

// Router configuration
angular
    .module('contacts-ui')
    .config([
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function ($locationProvider, $stateProvider, $urlRouterProvider) {

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'partials/core/app-view.html',
                    controller: 'AppController',
                    controllerAs: 'vm'
                })
                .state('not-found', {
                    url: '/not-found',
                    templateUrl: 'partials/not-found/not-found-view.html',
                    controller: 'AppController',
                    controllerAs: 'vm',
                    resolve: {
                        asset: function () {
                            return {};
                        }
                    }
                });

            $urlRouterProvider.otherwise('/contacts');

        }]);
