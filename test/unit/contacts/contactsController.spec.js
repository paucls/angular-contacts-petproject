'use strict';

describe('ContactsController', function () {

    const CONTACTS = Factory.buildList('contact', 5);

    let $rootScope;
    let $uibModal;
    let ContactsService;
    let vm;

    beforeEach(module('contacts-ui.core'));
    beforeEach(module('contacts-ui.contacts'));

    beforeEach(inject(function (_$rootScope_, $q, $controller, _$uibModal_, _ContactsService_) {
        $rootScope = _$rootScope_;
        $uibModal = _$uibModal_;
        ContactsService = _ContactsService_;

        spyOn($uibModal, 'open').and.returnValue({result: $q.when()});
        spyOn(ContactsService, 'getContacts').and.returnValue($q.when(CONTACTS));

        vm = $controller('ContactsController', {
            $uibModal: $uibModal,
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

    describe('openAddContactModal()', function () {

        it('should open a new modal instance', function () {
            vm.openAddContactModal();
            expect($uibModal.open).toHaveBeenCalled();
        });

        it('should reload table data when modal results on success', function () {
            vm.openAddContactModal();
            $rootScope.$apply();

            expect(ContactsService.getContacts.calls.count()).toBe(2);
        });

    });

    describe('openDeleteContactModal()', function () {

        it('should open a new modal instance', function () {
            vm.openDeleteContactModal();
            expect($uibModal.open).toHaveBeenCalled();
        });

        it('should reload table data when modal results on success', function () {
            vm.openDeleteContactModal();
            $rootScope.$apply();

            expect(ContactsService.getContacts.calls.count()).toBe(2);
        });

    });

});
