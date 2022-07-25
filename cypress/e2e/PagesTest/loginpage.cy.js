describe("Testing LoginPage", () => {
  it("should load in basic web skeleton", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in form and exit button", () => {
    cy.get(".login-from-container").should("exist");
    cy.get("[data-cy=login-email]").should("exist");
    cy.get("[data-cy=login-password]").should("exist");
    cy.get("[data-cy=login-clear]").should("exist");
    cy.get("[data-cy=login-submit]").should("exist");
    cy.get("[data-cy=login-exit]").should("exist");
  });

  it("should be able to type in fields and use clear button", () => {
    cy.get("[data-cy=login-email]").type("email@example.be");
    cy.get("[data-cy=login-password]").type("password123");
    cy.get("[data-cy=login-clear]").click();
    cy.get("[data-cy=login-email]").should("has.text", "");
    cy.get("[data-cy=login-password]").should("has.text", "");
  });

  it("should get error message for wrong credentials", () => {
    cy.get("[data-cy=login-email]").type("email@example.be");
    cy.get("[data-cy=login-password]").type("password123");
    cy.get("[data-cy=login-submit]").click();
    cy.get(".login-error").should(
      "has.text",
      "Your login credentials don't match an account in our system"
    );
  });

  it("should return to homepage when pressing exit button", () => {
    cy.get("[data-cy=login-exit]").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
