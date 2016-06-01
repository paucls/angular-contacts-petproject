'use strict';

describe('ContactsService', function () {

    const CONTACTS = Factory.buildList('contact', 5);

    let RestDomains;
    let ContactsService;
    let $httpBackend;
    let $q;
    let $scope;

    beforeEach(module('contacts-ui.core'));
    beforeEach(module('contacts-ui.contacts'));

    beforeEach(inject(function (_RestDomains_, _ContactsService_, _$httpBackend_, _$q_, $rootScope) {
        RestDomains = _RestDomains_;
        ContactsService = _ContactsService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $scope = $rootScope.$new();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getContacts()', function () {

        it('should retrieve contacts', function () {
            $httpBackend.expectGET('/contacts').respond(CONTACTS);

            let contacts = ContactsService.getContacts();
            $httpBackend.flush();
            contacts = resolvePromise(contacts, $q, $scope);

            expect(contacts).toEqual(CONTACTS);
        });

    });

});
