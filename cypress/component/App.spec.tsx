import * as React from 'react'
import { mount } from '@cypress/react'
import {App} from '../../src/App'

describe('App', () => {
  it('should mount', function () {
    mount(
      <App/>
    )
    cy.get("#mainContainer")
    .get("#masterListContainer")
    .get("#detailedViewContainer")
  })

  // Content loading
  it('should show progress spinner', function () {
    mount(
        <App/>
    )
    cy.get("#loadingIndicator")
  })

  it("should load masterlist", function(){
    mount(
        <App/>
    )
    cy.get(".masterList")
  })

    it("should load name style settings menu", function(){
        mount(
            <App />
        )

        cy.get("#settingsMenu")
    })

  // Interaction

  // You can click on a list entry to display correct detail view
  it("clicking on master list item should display a detail view", function() {
    mount(
        <App />
    )

    let userName : string;

    cy.get(".userContact")
        .first()
        .then(x => {
          userName = x.text();
        })
        .click()

    cy.get(".detailViewCard")
        .get("h4")
        .should(x => {
          expect(userName).to.equal(x.text())
        })
  })


  it("clicking on edit brings up correct info in edit view", () => {
    mount(
        <App />
    )

    let userName : string;

    cy.get(".userContact")
        .first()
        .click()
        // .get(".detailViewCard")
        .get("#userNameDetailed")
        .then(x => {
          userName = x.text();

          // why does this block of code only work in here while in the previous test it worked outside the then block?
          cy.get("#editButton")
              .click()

            cy.get("#editUserName")
              .should("have.value", userName )
        })

  })

  //Editing

  // Edit information, press 'save' and only that information changed
  it("only edited information should change on save", () => {
    mount(
        <App />
    )

    let userName : string;
    let userAddress : string;

    cy.get(".userContact")
        .first()
        .click()
        .get("h4")
        .then(x => {
          userName = x.text();
        })

      cy.get("#userAddressDetailed")
        .then(x => {
          userAddress = x.text();
        })

      cy.get("#editButton")
        .click()
        .get("#editUserName")
        .type('{selectall}{backspace}')
        .type("John Smith")

      cy.get("#saveButton")
        .first()
        .click()

      cy.get("#UserNameDetailed")
        .should(x => {
          expect(x.text()).to.not.equal(userName)
        })

      cy.get("#userNameDetailed")
        .should(x => {
            expect(x.text()).to.equal("John Smith")
        })

      cy.get("#userAddressDetailed")
        .should(x => {
          expect(x.text()).to.equal(userAddress)
        })
  })

    it("clicking on a contact should replace the open contact with clicked", () => {
        mount(
            <App />
        )

        let userName : string;

        cy.get(".userContact")
            .first()
            .click()
            .get("h4")
            .then(x => {
                userName = x.text();

                cy.get(".userContact")
                    .eq(3)
                    .click()

                cy.get("h4")
                    .should(x => {
                        expect(x.text()).to.not.equal(userName)
                    })
            })
    })

    it("clicking on another contact while in edit view should open the new contact", ()=> {
        mount(
            <App />
        )

        let userName : string;

        cy.get(".userContact")
            .first()
            .click()

        cy.get("#editButton")
            .click()


        cy.get("#editUserName")
            .then(x => {
                userName = x.text();

                cy.get(".userContact")
                    .eq(3)
                    .click()

                cy.get("h4")
                    .should(x=>{
                        expect(x.text()).to.not.equal(userName)
                    })
            })
    })

    it("clicking on another contact while in edit view should discard changes", ()=>{
        mount(
            <App />
        )

        let userName : string;

        cy.get(".userContact")
            .first()
            .click()
            .then(x =>{
                userName = x.text()

                cy.get("#editButton")
                    .click()

                cy.get("#editUserName")
                    .type("John Smith")


                cy.get(".userContact")
                    .eq(2)
                    .click()

                cy.get(".userContact")
                    .first()
                    .click()

                cy.get("h4")
                    .should(x=>{
                        expect(x.text()).to.not.equal("John Smith")
                    })
                    .and(x => {
                        expect(x.text()).to.equal(userName)
                    })
            })
    })

    it("canceling during edit should discard all changes", ()=>{
        mount(
            <App />
        )

        let userName : string;

        cy.get(".userContact")
            .eq(2)
            .click()

        cy.get("h4")
            .then(x => {
                userName = x.text()

                cy.get("#editButton")
                    .click()

                cy.get("#editUserName")
                    .type("Bob Smith")

                cy.get("#cancelButton")
                    .click()

                cy.get("h4")
                    .should(x => {
                        expect(x.text()).to.equal(userName)
                    })
                    .and(x => {
                        expect(x.text()).to.not.equal("Bob Smith")
                    })

            })
    })

    it("clicking again on the same contact should keep the same contact details open", () => {
        mount(
            <App />
        )

        let userName : string;

        cy.get(".userContact")
            .eq(1)
            .click()

        cy.get("h4")
            .then(x => {
                userName = x.text();

                cy.get(".userContact")
                    .eq(1)
                    .click()

                cy.get("h4")
                    .should(x=>{
                        expect(x.text()).to.equal(userName)
                    })
            })
    })

    it("first-last should be the default value of name style preferences", () => {
        mount(
            <App />
        )

        cy.get("#nameSettingsGroup :checked")
            .should("be.checked")
            .and("have.value", "first-last")

    })

    it("should be able to change the name style preference", () => {
        mount(
            <App />
        )

        cy.get('[type="radio"]').check('last-first')

        cy.get("#nameSettingsGroup :checked")
            .should("be.checked")
            .and("have.value", "last-first")

        cy.get('[type="radio"]').check('first-last')

        cy.get("#nameSettingsGroup :checked")
            .should("be.checked")
            .and("have.value", "first-last")
    })

    it("name format should be first-last when the option is selected", ()=>{
        mount(
            <App />
        )

        cy.get("#nameSettingsGroup :checked")
            .should("be.checked")
            .and("have.value", "first-last")

        cy.get(".userContact")
            .each(x => {
                if(x.text().includes(" ")){
                    expect(x.text()).to.not.contain(", ");
                }
            })
    })

    it("name format should be last-first when the option is selected", ()=>{
        mount(
            <App />
        )

        cy.get('[type="radio"]').check('last-first')


        cy.get(".userContact")
            .each(x => {
                if(x.text().includes(" ")){
                    expect(x.text()).to.contain(", ");
                }
            })
    })

    it("names should not have leading or trailing whitespaces", ()=>{
        mount(
            <App />
        )

        cy.get(".userContact")
            .eq(2)
            .click()

        cy.get("#editButton")
            .click()

        cy.get("#editUserName")
            .type("{selectall}{backspace}John ")

        cy.get("#saveButton")
            .click();

        cy.get(".userContact")
            .eq(2)
            .click()

        cy.get("h4")
            .then(x => {
                expect(x.text()).to.not.contain(" ")
            })
    })

    it("names with only first or last name should not have commas", ()=> {
        mount(
            <App />
        )

        cy.get('[type="radio"]').check('last-first')

        cy.get(".userContact")
            .eq(2)
            .click()

        cy.get("#editButton")
            .click()

        cy.get("#editUserName")
            .type("{selectall}{backspace}John ")

        cy.get("#saveButton")
            .click();

        cy.get(".userContact")
            .each(x => {
                if(!x.text().includes(" ")){
                    expect(x.text()).to.not.contain(",")
                }
            })
    })
})


