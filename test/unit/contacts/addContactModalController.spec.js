'use strict';

describe('AddContactModalController', function () {

    const CONTACT = Factory.build('contact');

    let $rootScope;
    let $uibModalInstanceSpy;
    let ContactsService;
    let vm;

    beforeEach(module('contacts-ui.core'));
    beforeEach(module('contacts-ui.contacts'));

    beforeEach(inject(function (_$rootScope_, $q, $controller, _ContactsService_) {
        $rootScope = _$rootScope_;
        ContactsService = _ContactsService_;

        // Spy services
        spyOn(ContactsService, 'createContact').and.returnValue($q.when());
        $uibModalInstanceSpy = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        // Instantiate controller
        vm = $controller('AddContactModalController', {
            $uibModalInstance: $uibModalInstanceSpy,
            ContactService: ContactsService
        });
        $rootScope.$apply();
    }));

    describe('cancel()', function () {

        it('should dismiss the modal', function () {
            vm.cancel();
            expect($uibModalInstanceSpy.dismiss).toHaveBeenCalledWith('cancel');
        });

    });

    describe('save()', function () {

        it('should call the service to create the contact', function () {
            expect(vm.processing).toBe(false);

            vm.save(CONTACT);
            expect(vm.processing).toBe(true);
            $rootScope.$apply();

            expect(ContactsService.createContact).toHaveBeenCalledWith(CONTACT);
        });

        it('should close the modal', function () {
            vm.save(CONTACT);
            $rootScope.$apply();

            expect($uibModalInstanceSpy.close).toHaveBeenCalled();
        });

    });

});
