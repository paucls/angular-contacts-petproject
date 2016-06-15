'use strict';

// Router configuration
angular
    .module('contacts-ui')
    .config(
        function ($locationProvider, $stateProvider, $urlRouterProvider) {

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'partials/core/app-view.html',
                    controller: 'AppController',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise('/contacts');

        });
