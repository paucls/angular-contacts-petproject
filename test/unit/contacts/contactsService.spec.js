'use strict';

describe('ContactsService', function () {

    const CONTACTS = Factory.buildList('contact', 5);

    let RestDomains;
    let ContactsService;
    let $httpBackend;
    let $q;
    let $scope;
    let toastr;

    beforeEach(module('contacts-ui.core'));
    beforeEach(module('contacts-ui.contacts'));

    beforeEach(inject(function ($rootScope, _$q_, _$httpBackend_, _toastr_, _ContactsService_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        toastr = _toastr_;
        ContactsService = _ContactsService_;

        spyOn(toastr, 'success');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('deleteContact()', function () {

        describe('when back-end operation results in success', function () {

            it('should emit a success message', function () {
                var contactId = 'id1';
                $httpBackend.expectDELETE('/contacts/' + contactId).respond(204, '');

                ContactsService.deleteContact(contactId);
                $httpBackend.flush();

                expect(toastr.success).toHaveBeenCalledWith('Contact deleted successfully');
            });

        });

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
