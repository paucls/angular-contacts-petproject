'use strict';

angular
    .module('contacts-ui.contacts')
    .controller('ContactsController',
        function (ContactsService) {

            let vm = this;

            vm.contacts = [];
            vm.loading = true;

            init();

            function init() {
                ContactsService.getContacts().then(contacts => vm.contacts = contacts);
            }

        });
