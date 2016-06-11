'use strict';

class AddContactModalPageObject {

    constructor() {
        this.modal = element(by.id('add-contact-modal'));
        this.header = this.modal.element(by.css('div.modal-header'));
        this.body = this.modal.element(by.css('div.modal-body'));

        this.firstNameInput = element(by.model('vm.contact.firstName'));
        this.lastNameInput = element(by.model('vm.contact.lastName'));
        this.companyInput = element(by.model('vm.contact.company'));
        this.phoneInput = element(by.model('vm.contact.phone'));
        this.emailInput = element(by.model('vm.contact.email'));
        this.addressInput = element(by.model('vm.contact.address'));
        this.notesTextArea = element(by.model('vm.contact.notes'));

        this.cancelButton = element(by.id('add-contact-modal-cancel'));
        this.saveButton = element(by.id('add-contact-modal-save'));
    }

    isDisplayed() {
        return this.modal.isDisplayed();
    }

}
module.exports = new AddContactModalPageObject();
