'use strict';

angular
    .module('contacts-ui')
    .run(['$httpBackend', function ($httpBackend) {

        const REGEXP_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

        let contacts = Factory.buildList('contact', 5);

        // Adding also a fixed contact for e2e tests.
        contacts.push(Factory.build('contact', {
            id: 'b47e37ff-f966-4249-838c-b5135199edb7',
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

        $httpBackend
            .whenDELETE(new RegExp('contacts/*'))
            .respond((method, url) => {
                var id = getUuidFromUrl(url);

                contacts = _.reject(contacts, {id: id});

                return [204];
            });

        function getUuidFromUrl(url) {
            var match = url.match(REGEXP_UUID);

            return match ? match[0] : '';
        }

    }]);
