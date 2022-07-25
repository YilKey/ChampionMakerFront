describe("Testing Collection page", () => {
  it("should be able to see correct user information", () => {
    cy.login("aba@api.be", "Aba1907.");
    cy.visit("http://localhost:3000/collection/aba/champions");

    cy.intercept("GET", "http://localhost:9000/api/users/aba", {
      fixture: "user.json",
    }).as("getUser");

    cy.wait("@getUser");
    cy.get("[data-cy=col-user]").should("exist").should("has.text", "Aba");
    cy.get("[data-cy=col-email]")
      .should("exist")
      .should("has.text", "aba@api.be");

    cy.intercept("GET", "http://localhost:9000/api/users/aba/champions", {
      fixture: "collectionChampion.json",
    }).as("getChampion");

    cy.wait("@getChampion");
    cy.get("[data-cy=col-champion]").should("exist");
  });

  it("should be able to see correct user champions", () => {
    cy.get("[data-cy=col-champion]").should("exist");
    cy.get("[data-cy=champ-rating]").first().should("have.text", "10");
    cy.get("[data-cy=champ-name]").first().should("have.text", "Test");
    cy.get("[data-cy=champ-user]").first().should("have.text", "Aba");
    cy.get("[data-cy=champ-type]").first().should("have.text", "Healer");
  });

  it("should be able to see and use add button", () => {
    cy.get("[data-cy=col-add]").should("exist").click();
    cy.get("[data-cy=col-name]").type("Test");
    cy.get("[data-cy=col-disc]").type("test discription");
    cy.get("[data-cy=col-type]").type("Tank");
    cy.get("[data-cy=col-submit]").should("exist");
    cy.get("[data-cy=col-close]").should("exist").click();
  });
});
