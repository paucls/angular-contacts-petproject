'use strict';

angular
    .module('contacts-ui.shopping-list')
    .config(function ($stateProvider) {

        // Routes for the tasks module
        $stateProvider
            .state('app.shopping-list', {
                url: '/shopping-list',
                templateUrl: 'partials/shopping-list/shopping-list-view.html'
            });

    });
