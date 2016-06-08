'use strict';

class ContactsPageObject {

    constructor() {
        // Header
        this.header = element(by.css('.page-header'));

        // Body
        this.addContactButton = element(by.id('add-contact-button'));
        this.contactsTableRows = element.all(by.repeater('contact in vm.contacts'));
        this.successToast = element(by.css('div.toast.toast-success'));
    }

    go() {
        browser.get(browser.params.url + 'contacts');
    }

    clickDeleteOnContactRow(rowNumber) {
        this.contactsTableRows.get(rowNumber).element(by.css('.delete-contact-btn')).click();
    }

}
module.exports = new ContactsPageObject();
