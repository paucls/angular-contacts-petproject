'use strict';

angular
    .module('contacts-ui.core')
    .service('AppService',
        function ($http) {

            return {
                getCurrentUser: getCurrentUser
            };

            function getCurrentUser() {
                return $http.get('/currentuser').then(response => response.data);
            }

        });
