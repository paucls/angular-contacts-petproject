'use strict';

Factory.define('contact')
    .attr('id', faker.random.uuid)
    .attr('firstName', faker.name.firstName)
    .attr('lastName', faker.name.lastName)
    .attr('company', faker.company.companyName)
    .attr('phone', faker.phone.phoneNumber)
    .attr('email', faker.internet.email)
    .attr('address', faker.name.lastName)
    .attr('notes', faker.lorem.sentence);
