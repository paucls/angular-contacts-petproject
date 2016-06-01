'use strict';

/**
 * Utility function that will do the promise unproxying.
 * Doc: http://ath3nd.wordpress.com/2013/08/05/15/
 *
 * @param promise
 * @param q
 * @param scope
 * @returns {*}
 */
function resolvePromise(promise, q, scope) {
    var defer = q.defer();
    var unproxiedPromise;
    promise.then(function (value) {
        unproxiedPromise = value;
    });
    defer.resolve();
    scope.$apply();
    return unproxiedPromise;
}
