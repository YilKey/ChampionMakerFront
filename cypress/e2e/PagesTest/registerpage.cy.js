describe("Testing RegisterPage", () => {
  it("should load in basic web skeleton", () => {
    cy.visit("http://localhost:3000/register");
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in form and exit button", () => {
    cy.get("[data-cy=regis-name]").should("exist");
    cy.get("[data-cy=regis-email]").should("exist");
    cy.get("[data-cy=regis-password]").should("exist");
    cy.get("[data-cy=regis-password2]").should("exist");
    cy.get("[data-cy=regis-clear]").should("exist");
    cy.get("[data-cy=regis-exit]").should("exist");
  });

  it("should be able to type in fields and use clear button", () => {
    cy.get("[data-cy=regis-name]").type("Edward");
    cy.get("[data-cy=regis-email]").type("email@example.be");
    cy.get("[data-cy=regis-password]").type("password123");
    cy.get("[data-cy=regis-password2]").type("password123");
    cy.get("[data-cy=regis-clear]").click();
    cy.get("[data-cy=regis-name]").should("has.text", "");
    cy.get("[data-cy=regis-email]").should("has.text", "");
    cy.get("[data-cy=regis-password]").should("has.text", "");
    cy.get("[data-cy=regis-password2]").should("has.text", "");
  });

  it("should get error message for weak password", () => {
    cy.get("[data-cy=regis-name]").type("Edward");
    cy.get("[data-cy=regis-email]").type("email@example.be");
    cy.get("[data-cy=regis-password]").type("p");
    cy.get("[data-cy=regis-password2]").type("p");
    cy.get("[data-cy=regis-submit]").click();
    cy.get(".login-error").should("exist");
  });

  it("should return to homepage when pressing exit button", () => {
    cy.get("[data-cy=regis-exit]").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
