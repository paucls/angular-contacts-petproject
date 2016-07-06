'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('ContactsController',
        function (_, $uibModal, ContactsService) {

            let vm = this;

            vm.contacts = [];
            vm.loading = true;

            vm.openAddContactModal = openAddContactModal;
            vm.openEditContactModal = openEditContactModal;
            vm.openDeleteContactModal = openDeleteContactModal;

            init();

            function init() {
                ContactsService.getContacts().then(contacts => vm.contacts = contacts);
            }

            function openAddContactModal() {
                $uibModal.open({
                    templateUrl: 'partials/contacts/add-contact-modal.html',
                    controller: 'AddContactModalController',
                    controllerAs: 'vm',
                    bindToController: true
                }).result.then(init);
            }

            function openEditContactModal(contact) {
                $uibModal.open({
                    templateUrl: 'partials/contacts/edit-contact-modal.html',
                    controller: 'EditContactModalController',
                    controllerAs: 'vm',
                    bindToController: true,
                    resolve: {
                        contact: _.constant(contact)
                    }
                }).result.then(init);
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
