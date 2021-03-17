import * as React from 'react'
import {mount} from '@cypress/react'
import Masterlist from "../../src/components/Masterlist"
import * as faker from "faker"
import {v4 as uuidv4} from "uuid";

const testData = (n) => {
    let dataArray = [];

    for (let i = 0; i < n; i++) {
        let item = {
            name: faker.fake("{{name.firstName}} {{name.lastName}}"),
            address: faker.fake("{{address.streetAddress}}"),
            birthday: faker.fake("{{date.past}}"),
            email: faker.fake("{{internet.email}}"),
            phone: faker.fake("{{phone.phoneNumber}}"),
            id: uuidv4()
        }
        dataArray.push(item);
    }

    return dataArray;
}

const emptyTestData = [
    {
        name: "",
        address: faker.fake("{{address.streetAddress}}"),
        birthday: faker.fake("{{date.past}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        id: uuidv4()
    },
    {
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        address: faker.fake("{{address.streetAddress}}"),
        birthday: faker.fake("{{date.past}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        id: uuidv4()
    }
]

describe('Masterlist', () => {
    it('should mount', function () {
        mount(
            <Masterlist info={testData(0)} onItemClick={() => {
            }} onAddUsers={() => {
            }}/>
        )
        cy.get(".masterList")
    })

    // Contact amount
    // have zero contacts
    it('should have 0 contact list items', function () {
        mount(
            <Masterlist info={testData(0)} onItemClick={() => {
            }} onAddUsers={() => {
            }}/>
        )
        cy.get(".userContact")
            .should("not.exist")
    })

    // have 7 contacts
    it('should have 7 contact list items', function () {
        mount(
            <Masterlist info={testData(7)} onItemClick={() => {
            }} onAddUsers={() => {
            }}/>
        )
        cy.get(".masterList")
            .find(".userContact")
            .its("length")
            .should("eq", 7)
    })

    // have 999 contacts
    it('should have 999 contact list items', function () {
        mount(
            <Masterlist info={testData(999)} onItemClick={() => {
            }} onAddUsers={() => {
            }}/>
        )
        cy.get(".masterList")
            .find(".userContact")
            .its("length")
            .should("eq", 999)
    })


    // Contact content
    // contact is missing name
    it("should show unknown if contact has no name", function(){
        mount(
            <Masterlist info={emptyTestData} onItemClick={() => {}} onAddUsers={() => {}} />
        )
            cy.get(".userContact")
                .contains("Unknown")
    })
})
