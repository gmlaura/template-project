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
        .get(".detailViewCard")
        .get("#userNameDetailed")
        .then(x => {
          userName = x.text();

          // why does this block of code only work in here while in the previous test it worked outside the then block?
          cy.get("button")
              .click()
              .get(".editUserCard")
              .get("#editUserName")
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
        .get(".detailViewCard")
        .get("h4")
        .then(x => {
          userName = x.text();
        })
        .get("#userAddressDetailed")
        .then(x => {
          userAddress = x.text();
        })
        .get("button")
        .click()
        .get(".editUserCard")
        .get("#editUserName")
        .type('{selectall}{backspace}')
        .type("John Smith")
        .get("button")
        .first()
        .click()
        .get("#UserNameDetailed")
        .should(x => {
          expect(x.text()).to.not.equal(userName)
        })
        .get("#userNameDetailed")
        .should(x => {
            expect(x.text()).to.equal("John Smith")
        })
        .get("#userAddressDetailed")
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
                    .get("h4")
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
            .get("button")
            .click()
            .get("#editUserName")
            .then(x => {
                userName = x.text();

                cy.get(".userContact")
                    .eq(3)
                    .click()
                    .get("h4")
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

                cy.get("button")
                    .click()
                    .get("#editUserName")
                    .type("John Smith")
                    .get(".userContact")
                    .eq(2)
                    .click()
                    .get(".userContact")
                    .first()
                    .click()
                    .get("h4")
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
            .get("h4")
            .then(x => {
                userName = x.text()

                cy.get("button")
                    .click()
                    .get("#editUserName")
                    .type("Bob Smith")
                    .get("#cancelButton")
                    .click()
                    .get("h4")
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
            .get("h4")
            .then(x => {
                userName = x.text();

                cy.get(".userContact")
                    .eq(1)
                    .click()
                    .get("h4")
                    .should(x=>{
                        expect(x.text()).to.equal(userName)
                    })
            })
    })
})


