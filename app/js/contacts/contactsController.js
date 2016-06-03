'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('ContactsController',
        function (_, $uibModal, ContactsService) {

            let vm = this;

            vm.contacts = [];
            vm.loading = true;

            vm.openDeleteContactModal = openDeleteContactModal;

            init();

            function init() {
                ContactsService.getContacts().then(contacts => vm.contacts = contacts);
            }

            function openDeleteContactModal(contact) {
                $uibModal.open({
                    templateUrl: 'partials/contacts/delete-contact-modal.html',
                    controller: 'DeleteContactModalController',
                    controllerAs: 'vm',
                    bindToController: true,
                    resolve: {
                        contact: _.constant(contact)
                    }
                }).result.then(init);
            }

        });
