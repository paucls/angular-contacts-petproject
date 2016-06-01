'use strict';

describe('AppController', function () {

    var TEST_CURRENT_USER = {displayName: 'John Doe'};

    var $rootScope;
    var vm;
    var AppService;

    beforeEach(module('contacts-ui.core'));

    beforeEach(inject(function (_$rootScope_, $q, $controller, _AppService_) {
        $rootScope = _$rootScope_;
        AppService = _AppService_;

        spyOn(AppService, 'getCurrentUser').and.returnValue($q.when(TEST_CURRENT_USER));

        vm = $controller('AppController', {
            AppService: AppService
        });
        $rootScope.$apply();
    }));

    describe('init()', function () {

        it('should call the service to retrieve the current user', function () {
            expect(AppService.getCurrentUser).toHaveBeenCalled();
            expect(vm.user).toBeDefined();
            expect(vm.user).toEqual(TEST_CURRENT_USER);
        });

    });

});
