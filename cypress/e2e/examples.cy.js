describe("Various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getDataTest("nav-examples").click();
    cy.location("pathname").should("equal", "/examples");

    cy.getDataTest("nav-component").click();
    cy.location("pathname").should("equal", "/component");

    cy.getDataTest("nav-best-practices").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  it("interceps", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getDataTest("post-button").click();
  });

  it.only("grudges", () => {
    const grudge1 = "my grudge is bad";
    const grudge2 = "my grudge is so bad that it is not good";
    cy.contains(/add some grudges/i).should("exist");

    // make sure to check custom commands
    // actual functions are there
    cy.checkGrudgeList(0);
    cy.getDataTest("grudge-list-title").should("have.text", "Add Some Grudges");
    cy.getDataTest("clear-button").should("not.exist");

    cy.addGrudge(grudge1);
    cy.checkGrudgeList(1, grudge1);
    cy.getDataTest("grudge-list-title").should("have.text", "Grudges");

    cy.checkGrudgeList(1, grudge1);
    cy.addGrudge(grudge2);
    cy.checkGrudgeList(2, grudge2);

    cy.deleteGrudge();

    cy.checkGrudgeList(1, grudge2);

    cy.clearGrudges();
    cy.checkGrudgeList(0);
  });
});
