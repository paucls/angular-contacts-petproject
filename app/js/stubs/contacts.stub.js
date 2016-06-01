'use strict';

angular
    .module('contacts-ui')
    .run(['$httpBackend', function ($httpBackend) {

        let contacts = Factory.buildList('contact', 5);

        // Adding also a fixed contact for e2e tests.
        contacts.push(Factory.build('contact', {
            id: 1,
            firstName: 'Addison',
            lastName: 'Reynolds',
            company: 'Ac Consulting',
            phone: '1-352-850-5507',
            email: 'addison@email.com',
            address: '7494 Penatibus Road',
            notes: 'CEO'
        }));

        $httpBackend
            .whenGET(new RegExp('contacts$'))
            .respond(() => [200, contacts]);

    }]);
