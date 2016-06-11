'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('AddContactModalController',
        function ($uibModalInstance, ContactsService) {
            let vm = this;

            vm.contact = {};
            vm.processing = false;

            vm.cancel = cancel;
            vm.save = save;

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }

            function save() {
                vm.processing = true;
                
            }
        });
