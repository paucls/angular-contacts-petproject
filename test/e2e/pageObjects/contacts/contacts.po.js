'use strict';

class ContactsPageObject {

    constructor() {
        // Header
        this.pageTitle = element(by.css('.header-title'));
        this.addContactButton = element(by.id('add-contact-button'));

        // Table
        this.contactsTableRows = element.all(by.repeater('contact in vm.contacts'));
    }

    go() {
        browser.get(browser.params.url + 'projects');
    }

}
module.exports = new ContactsPageObject();
