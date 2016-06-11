'use strict';

class AddContactModalPageObject {

    constructor() {
        this.modal = element(by.id('add-contact-modal'));
        this.header = this.modal.element(by.css('div.modal-header'));
        this.body = this.modal.element(by.css('div.modal-body'));

        this.cancelButton = element(by.id('add-contact-modal-cancel'));
        this.saveButton = element(by.id('add-contact-modal-save'));
    }

    isDisplayed() {
        return this.modal.isDisplayed();
    }

}
module.exports = new AddContactModalPageObject();
