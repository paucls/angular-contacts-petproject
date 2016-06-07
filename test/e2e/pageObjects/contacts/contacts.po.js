'use strict';

class ContactsPageObject {

    constructor() {
        // Header
        this.pageTitle = element(by.css('.page-header'));

        // Body
        this.addContactButton = element(by.id('add-contact-button'));
        this.contactsTableRows = element.all(by.repeater('contact in vm.contacts'));
    }

    go() {
        browser.get(browser.params.url + 'contacts');
    }

}
module.exports = new ContactsPageObject();
