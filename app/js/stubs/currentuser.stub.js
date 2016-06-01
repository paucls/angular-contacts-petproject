'use strict';

angular
    .module('contacts-ui')
    .run(function ($httpBackend) {

        const CURRENT_USER = {
            id: 'ee744462-cbe4-437f-ac39-1e190055ac47',
            userName: 'jdoe',
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'John Doe',
            email: 'john.doe@email.com'
        };

        $httpBackend
            .whenGET(new RegExp('currentuser$'))
            .respond(() => [200, CURRENT_USER]);

    });
