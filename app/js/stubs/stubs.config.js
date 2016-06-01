'use strict';

// Configure the Mock HTTP Backend
angular
    .module('contacts-ui')
    .config(['$provide', function ($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }]);

// Define http requests that can bypass the mock http backend
angular
    .module('contacts-ui')
    .run(['$httpBackend', function ($httpBackend) {
        $httpBackend.whenGET(/^partials\/.*/).passThrough();
    }]);

// Decorate Mock HTTP Backend to log requests
angular
    .module('contacts-ui')
    .config(function ($provide) {
        $provide.decorator('$httpBackend', function ($delegate) {
            let decoratedHttpBackend = function (method, url, data, callback, headers, timeout, withCredentials, responseType) {
                console.log(method + ' ' + url);

                return $delegate.call(this, method, url, data, callback, headers, timeout, withCredentials, responseType);
            };

            for (var key in $delegate) {
                if ($delegate.hasOwnProperty(key)) {
                    decoratedHttpBackend[key] = $delegate[key];
                }
            }

            return decoratedHttpBackend;
        });
    });
