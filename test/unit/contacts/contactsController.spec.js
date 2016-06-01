'use strict';

describe('ContactsController', function () {

    const CONTACTS = Factory.buildList('contact', 5);

    let $rootScope;
    let vm;
    let ContactsService;

    beforeEach(module('contacts-ui.core'));
    beforeEach(module('contacts-ui.contacts'));

    beforeEach(inject(function (_$rootScope_, $q, $controller, _ContactsService_) {
        $rootScope = _$rootScope_;
        ContactsService = _ContactsService_;

        spyOn(ContactsService, 'getContacts').and.returnValue($q.when(CONTACTS));

        vm = $controller('ContactsController', {
            ContactsService: ContactsService
        });
        $rootScope.$apply();
    }));

    describe('init()', function () {

        it('should retrieve contacts from the service to initialize the view', function () {
            expect(ContactsService.getContacts).toHaveBeenCalled();
            expect(vm.contacts).toBeDefined();
        });

    });

});
