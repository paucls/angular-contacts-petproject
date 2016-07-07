'use strict';

angular
    .module('contacts-ui.tasks')
    .config(function ($stateProvider) {

        // Routes for the tasks module
        $stateProvider
            .state('app.tasks', {
                url: '/tasks',
                templateUrl: 'partials/tasks/tasks-view.html'
            });

    });
