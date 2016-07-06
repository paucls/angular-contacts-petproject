'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('EditContactModalController',
        function (_, $uibModalInstance, ContactsService, contact) {
            let vm = this;

            vm.contact = _.clone(contact);
            vm.processing = false;

            vm.cancel = cancel;
            vm.update = update;

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }

            function update(contact) {
                vm.processing = true;

                ContactsService
                    .updateContact(contact)
                    .then($uibModalInstance.close);
            }
        });
