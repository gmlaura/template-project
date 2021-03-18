import * as React from 'react'
import { mount } from '@cypress/react'
import DetailedView from "../../src/components/DetailedView";
import * as faker from "faker"
import {v4 as uuidv4} from "uuid";

describe("DetailedView", () =>{

    const testData = {
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        address: faker.fake("{{address.streetAddress}}"),
        birthday: faker.fake("{{date.past}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        id: uuidv4()
    }

    const emptyTestData = {
        name: "",
        address: "",
        birthday: "",
        email: "",
        phone: "",
        id: uuidv4()
    }

    it("should mount", () => {
        mount(
            <DetailedView item={testData} handleEditClicked={()=> {}}/>
        )

        cy.get(".detailViewCard")
    })

    it("all empty fields should say unknown", () => {
        mount(
            <DetailedView item={emptyTestData} handleEditClicked={()=>{}} />
        )

        cy.get("#userNameDetailed")
            .should(x=> {
                expect(x.text()).to.equal("Unknown")
            })

        cy.get("#userAddressDetailed")
            .should(x=> {
                expect(x.text()).to.equal("Unknown")
            })

        cy.get("#userBirthdayDetailed")
            .should(x=> {
                expect(x.text()).to.equal("Unknown")
            })

        cy.get("#userEmailDetailed")
            .should(x=> {
                expect(x.text()).to.equal("Unknown")
            })

        cy.get("#userPhoneDetailed")
            .should(x=> {
                expect(x.text()).to.equal("Unknown")
            })
    })
})