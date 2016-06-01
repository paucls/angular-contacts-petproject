'use strict';

// App main module definition
angular
    .module('contacts-ui',
    [
        /*
         * Everybody has access to these.
         * We could place these under every feature area, but this is easier to maintain.
         */
        'contacts-ui.core',

        /*
         * Feature areas
         */
		'contacts-ui.contacts'
	]);
