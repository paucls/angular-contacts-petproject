'use strict';

// Controller for the base abstract route (app).
angular
    .module('contacts-ui.core')
    .controller('AppController',
        function (AppService) {

            let vm = this;

            vm.loading = true;
            vm.user = {};

            init();

            function init() {
                AppService.getCurrentUser()
                    .then(user => vm.user = user)
                    .finally(() => vm.loading = false);
            }

        });
