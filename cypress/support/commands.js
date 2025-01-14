// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add("addGrudge", (newGrudge) => {
  return (cy.getDataTest("grudge-input").within(() => {
    cy.get("input").type(newGrudge);
  }), cy.getDataTest("grudge-button").click())
});

Cypress.Commands.add("checkGrudgeList", (n, grudge) => {
  if (n == 0) {
    return cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", n);
    });
  }
    return cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", n);
      cy.get("li").its(n - 1).should("contains.text", grudge);
    });
});

Cypress.Commands.add('deleteGrudge', () => {
  return cy.getDataTest("grudge-list").within(() => {
    cy.get("li").its(0).within(() => {
      cy.get('button').click();
    });
  });
});

Cypress.Commands.add('clearGrudges', () => {
  return cy.getDataTest('clear-button').click();
})
