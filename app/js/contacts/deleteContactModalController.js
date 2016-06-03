'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('DeleteContactModalController',
        function ($uibModalInstance, ContactsService, contact) {
            let vm = this;

            vm.contact = contact;
            vm.processing = false;

            vm.cancel = cancel;
            vm.remove = remove;

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }

            function remove() {
                vm.processing = true;

                ContactsService
                    .deleteContact(contact.id)
                    .then($uibModalInstance.close);
            }
        });
