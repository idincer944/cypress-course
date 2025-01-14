describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    const correctEmail = "idincer944@gmail.com";
    const inCorrectEmail = "idincer944@gmail.io";
    cy.contains(/Testing Forms/i).should('exist');
    cy.getDataTest("email-input").find("input").as("email-input");
    cy.get("@email-input").type(correctEmail);
    cy.getDataTest("subscribe-button").click();
    cy.contains(`Successfully subbed: ${correctEmail}`).should('exist');
    cy.wait(3000);
    cy.contains(`Successfully subbed: ${correctEmail}`).should('not.exist');

    cy.get("@email-input").clear().type(inCorrectEmail);
    cy.getDataTest("subscribe-button").click();
    cy.contains(`Invalid email: ${inCorrectEmail}`).should('exist');
    cy.wait(3000);
    cy.contains(`Invalid email: ${inCorrectEmail}!`).should('not.exist');

    cy.contains(/fail!/i).should('not.exist');
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should('exist');
});
});
