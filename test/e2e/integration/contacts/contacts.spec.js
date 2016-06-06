'use strict';

describe('Contacts', function () {

    let contactsPage = require('../../../pageObjects/contacts/contacts.po.js');
    let deleteContactModal = require('../../../pageObjects/contacts/deleteContactModal.po.js');

    beforeEach(function () {
        contactsPage.go();
    });

    describe('Header', function () {

        it('should display page title', function () {
            expect(contactsPage.pageTitle.getText()).toBe('Contacts');
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

});
