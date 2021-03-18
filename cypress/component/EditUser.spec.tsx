import * as React from 'react'
import { mount } from '@cypress/react'
import EditUser from "../../src/components/EditUser";
import * as faker from "faker"
import {v4 as uuidv4} from "uuid";

const testData = {
    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    address: faker.fake("{{address.streetAddress}}"),
    birthday: faker.fake("{{date.past}}"),
    email: faker.fake("{{internet.email}}"),
    phone: faker.fake("{{phone.phoneNumber}}"),
    id: uuidv4()
}

describe("EditUser", () => {
    it('should mount', function () {
        mount(
          <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.get(".editUserCard")
    })

    it("save button should be active when there is a name", () => {
        mount(
            <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.contains("Save")
            .should("not.be.disabled")
    })

    it("save button should be disabled when name field is empty", () => {
        mount(
            <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.get("#editUserName")
            .type("{selectall}{backspace}")

        cy.get("#saveButton")
            .should("be.disabled")
    })

    it("save button should be available even if address, email and phone fields are empty", () => {
        mount(
            <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.get("#editUserAddress")
            .type("{selectall}{backspace}")
            .get("#editUserEmail")
            .type("{selectall}{backspace}")
            .get("#editUserPhone")
            .type("{selectall}{backspace}")
            .get("#saveButton")
            .should("not.be.disabled")
    })

    it("cancel button should be available regardless of the state of inputs", ()=> {
        mount(
            <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.get("#cancelButton")
            .should("not.be.disabled")
            .get("#editUserName")
            .type("{selectall}{backspace}")
            .get("#cancelButton")
            .should("not.be.disabled")
            .get("#editUserAddress")
            .type("{selectall}{backspace}")
            .get("#editUserEmail")
            .type("{selectall}{backspace}")
            .get("#editUserPhone")
            .type("{selectall}{backspace}")
            .get("#cancelButton")
            .should("not.be.disabled")
    })

    it("birthday should be editable", ()=>{
        mount(
            <EditUser item={testData} handleEditSubmission={() => {}} handleCancelEdit={() => {}}/>
        )

        cy.get("#editUserBirthday")
            .type("2021-05-01")
    })
})