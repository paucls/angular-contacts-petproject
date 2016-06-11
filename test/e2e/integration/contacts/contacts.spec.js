'use strict';

describe('Contacts', function () {

    let contactsPage = require('../../pageObjects/contacts/contacts.po.js');
    let addContactModal = require('../../pageObjects/contacts/addContactModal.po.js');
    let deleteContactModal = require('../../pageObjects/contacts/deleteContactModal.po.js');

    beforeEach(function () {
        contactsPage.go();
    });

    describe('Header', function () {

        it('should display page title', function () {
            expect(contactsPage.header.getText()).toBe('Contacts');
        });

        it('should display a button for add project', function () {
            expect(contactsPage.addContactButton.isDisplayed()).toBe(true);
        });

    });

    describe('Contacts Table', function () {

        it('should have 6 visible rows', function () {
            expect(contactsPage.contactsTableRows.count()).toBe(6);
        });

    });

    describe('Delete Contact dialog', function () {

        it('should be shown when delete action is clicked on a contact row', function () {
            expect(contactsPage.contactsTableRows.count()).toBe(6);
            contactsPage.clickDeleteOnContactRow(0);

            expect(deleteContactModal.isDisplayed()).toBeTruthy();
            expect(deleteContactModal.header.getText()).toBe('Delete Contact');
            expect(deleteContactModal.body.getText()).toContain('Are you sure you wish to delete');
            expect(deleteContactModal.deleteButton.isDisplayed()).toBeTruthy();
            expect(deleteContactModal.cancelButton.isDisplayed()).toBeTruthy();
        });

        it('should remove the contact and notify success', function () {
            expect(contactsPage.contactsTableRows.count()).toBe(6);

            contactsPage.clickDeleteOnContactRow(0);
            deleteContactModal.deleteButton.click();

            expect(contactsPage.successToast.isDisplayed()).toBeTruthy();
            expect(contactsPage.successToast.getText()).toBe('Contact deleted successfully');
            expect(contactsPage.contactsTableRows.count()).toBe(5);
        });

    });

    describe('Add Contact dialog', function () {

        beforeEach(function () {
            contactsPage.addContactButton.click();
        });

        it('should be displayed and initialized correctly', function () {
            expect(addContactModal.isDisplayed()).toBeTruthy();
            expect(addContactModal.header.getText()).toBe('Add Contact');

            expect(addContactModal.firstNameInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.lastNameInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.companyInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.phoneInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.emailInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.addressInput.isDisplayed()).toBeTruthy();
            expect(addContactModal.notesTextArea.isDisplayed()).toBeTruthy();

            expect(addContactModal.saveButton.isDisplayed()).toBeTruthy();
            expect(addContactModal.saveButton.getAttribute('disabled')).toBeTruthy();
            expect(addContactModal.cancelButton.isDisplayed()).toBeTruthy();
            expect(addContactModal.cancelButton.getAttribute('disabled')).toBeNull();
        });

        it('should prevent the user from saving with invalid fields', function () {
            expect(addContactModal.saveButton.getAttribute('disabled')).toBeTruthy();

            addContactModal.firstNameInput.sendKeys('John');

            expect(addContactModal.saveButton.getAttribute('disabled')).toBeFalsy();
        });

        it('should save contact when fields are populated and user clicks save', function () {
            addContactModal.firstNameInput.sendKeys('John');
            addContactModal.lastNameInput.sendKeys('Doe');
            addContactModal.companyInput.sendKeys('ACME');
            addContactModal.phoneInput.sendKeys('075 1234567');
            addContactModal.emailInput.sendKeys('john.doe@acme.com');
            addContactModal.addressInput.sendKeys('Acme City');
            addContactModal.notesTextArea.sendKeys('Some notes ...');

            //TODO
        });

    });

});
