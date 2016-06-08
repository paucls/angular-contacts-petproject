'use strict';

describe('Contacts', function () {

    let contactsPage = require('../../pageObjects/contacts/contacts.po.js');
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

    describe('Delete Contact', function () {

        it('should show the Delete Contact dialog when delete action is clicked on a contact', function () {
            expect(contactsPage.contactsTableRows.count()).toBe(6);
            contactsPage.clickDeleteOnContactRow(0);

            expect(deleteContactModal.isDisplayed()).toBeTruthy();
            expect(deleteContactModal.header.getText()).toBe('Delete Contact');
            expect(deleteContactModal.body.getText()).toContain('Are you sure you wish to delete');
            expect(deleteContactModal.okButton.isDisplayed()).toBeTruthy();
            expect(deleteContactModal.cancelButton.isDisplayed()).toBeTruthy();
        });

        it('should remove the contact and notify success', function () {
            expect(contactsPage.contactsTableRows.count()).toBe(6);

            contactsPage.clickDeleteOnContactRow(0);
            deleteContactModal.okButton.click();

            expect(contactsPage.successToast.isDisplayed()).toBeTruthy();
            expect(contactsPage.successToast.getText()).toBe('Contact deleted successfully');
            expect(contactsPage.contactsTableRows.count()).toBe(5);
        });

    });

});
