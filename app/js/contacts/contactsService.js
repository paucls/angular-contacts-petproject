'use strict';

angular
    .module('contacts-ui.contacts')
    .service('ContactsService',
        function ($http, toastr) {

            return {
                createContact: createContact,
                deleteContact: deleteContact,
                getContacts: getContacts
            };

            function createContact(contact) {
                return $http
                    .post('/contacts', contact)
                    .then(contact => toastr.success('Contact created successfully'));
            }

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
