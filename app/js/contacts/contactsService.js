'use strict';

angular
    .module('contacts-ui.contacts')
    .service('ContactsService',
        function ($http, toastr) {

            return {
                deleteContact: deleteContact,
                getContacts: getContacts
            };

            function deleteContact(conctactId) {
                return $http
                    .delete('/contacts/' + conctactId)
                    .then(() => toastr.success('Contact deleted successfully'));
            }

            function getContacts() {
                return $http
                    .get('/contacts')
                    .then(response => response.data);
            }

        });
