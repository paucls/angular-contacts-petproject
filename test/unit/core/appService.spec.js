'use strict';

describe('AppService', function () {

    var TEST_CURRENT_USER = {displayName: 'John Doe'};

    var RestDomains;
    var AppService;
    var $httpBackend;
    var $q;
    var $scope;

    beforeEach(module('contacts-ui.core'));

    beforeEach(inject(function (_RestDomains_, _AppService_, _$httpBackend_, _$q_, $rootScope) {
        RestDomains = _RestDomains_;
        AppService = _AppService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $scope = $rootScope.$new();
    }));

    describe('getCurrentUser()', function () {

        it('should retrieve the current user', function () {
            $httpBackend.expectGET(new RegExp('/currentuser')).respond(TEST_CURRENT_USER);

            var promise = AppService.getCurrentUser();

            $httpBackend.flush();
            var result = resolvePromise(promise, $q, $scope);
            expect(result).toEqual(TEST_CURRENT_USER);
        });

    });

});
