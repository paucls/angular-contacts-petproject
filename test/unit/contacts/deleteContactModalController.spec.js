'use strict';

describe('DeleteContactModalController', function () {

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
        spyOn(ContactsService, 'deleteContact').and.returnValue($q.when());
        $uibModalInstanceSpy = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        // Instantiate controller
        vm = $controller('DeleteContactModalController', {
            $uibModalInstance: $uibModalInstanceSpy,
            ContactService: ContactsService,
            contact: CONTACT
        });
        $rootScope.$apply();
    }));

    describe('cancel()', function () {

        it('should dismiss the modal', function () {
            vm.cancel();
            expect($uibModalInstanceSpy.dismiss).toHaveBeenCalledWith('cancel');
        });

    });

    describe('remove()', function () {

        it('should call the service to remove the contact', function () {
            expect(vm.processing).toBe(false);

            vm.remove();
            expect(vm.processing).toBe(true);
            $rootScope.$apply();

            expect(ContactsService.deleteContact).toHaveBeenCalledWith(CONTACT.id);
        });

        it('should close the modal', function () {
            vm.remove();
            $rootScope.$apply();

            expect($uibModalInstanceSpy.close).toHaveBeenCalled();
        });

    });

});
