'use strict';

// Default ui.bootstrap.tooltip configuration
angular
    .module('contacts-ui')
    .config(function ($uibTooltipProvider) {
        $uibTooltipProvider.options({
            popupDelay: 500
        });
    });

// Default ui.bootstrap.modal configuration
angular
    .module('contacts-ui')
    .config(function ($uibModalProvider) {
        $uibModalProvider.options = {
            backdrop: 'static',
            animation: true
        };
    });
