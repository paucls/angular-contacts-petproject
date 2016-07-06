'use strict';

angular
    .module('contacts-ui.contacts')
    .service('ContactsService',
        function ($http, toastr) {

            return {
                createContact: createContact,
                deleteContact: deleteContact,
                getContacts: getContacts,
                updateContact: updateContact
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

            function updateContact(contact) {
                return $http
                    .post(`/contacts/${contact.id}`, contact)
                    .then(contact => toastr.success('Contact updated successfully'));
            }

        });
