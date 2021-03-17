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
        .type('{del}{selectall}{backspace}')
        .type("John Smith")
        .get("button")
        .first()
        .click()
        .get("#UserNameDetailed")
        .should(x => {
          expect(x.text()).to.not.equal(userName)
        })
        .get("#userAddressDetailed")
        .should(x => {
          expect(x.text()).to.equal(userAddress)
        })
  })
})


