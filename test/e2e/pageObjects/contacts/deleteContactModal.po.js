'use strict';

class DeleteContactModalPageObject {

    constructor() {
        this.modal = element(by.id('delete-contact-modal'));
        this.modalHeader = this.modal.element(by.css('div.modal-header'));

        this.okButton = element(by.id('delete-contact-modal-ok'));
        this.cancelButton = element(by.id('delete-contact-modal-cancel'));
    }

    isDisplayed() {
        return this.modal.isDisplayed();
    }

}
module.exports = new DeleteContactModalPageObject();
