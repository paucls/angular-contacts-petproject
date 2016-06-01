'use strict';

angular
    .module('contacts-ui.contacts')
    .service('ContactsService',
        function ($http) {

            return {
                deleteContact: deleteContact,
                getContacts: getContacts
            };

            function deleteContact() {
                return;
            }

            function getContacts() {
                return $http.get('/contacts').then(response => response.data);
            }

        });
