'use strict';

angular
    .module('contacts-ui.contacts')
    .config(function ($stateProvider) {

        // Routes for the contacts module
        $stateProvider
            .state('app.contacts', {
                url: '/contacts',
                templateUrl: 'partials/contacts/contacts-view.html',
                controller: 'ContactsController',
                controllerAs: 'vm'
            });

    });
