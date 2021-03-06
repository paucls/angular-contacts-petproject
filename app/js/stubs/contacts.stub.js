'use strict';

angular
    .module('contacts-ui')
    .run(function ($httpBackend, _) {

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
            .whenPOST(new RegExp('contacts$'))
            .respond((method, url, data) => {
                let contact = JSON.parse(data);

                contacts.push(contact);

                return [201];
            });

        $httpBackend
            .whenPOST(new RegExp('contacts/*'))
            .respond((method, url, data) => {
                let contact = JSON.parse(data);
                let index = _.findIndex(contacts, {id: contact.id});

                contacts[index] = contact;

                return [201, contact];
            });

        $httpBackend
            .whenDELETE(new RegExp('contacts/*'))
            .respond((method, url) => {
                let id = getUuidFromUrl(url);

                contacts = _.reject(contacts, {id: id});

                return [204];
            });

        function getUuidFromUrl(url) {
            let match = url.match(REGEXP_UUID);

            return match ? match[0] : '';
        }

    });
