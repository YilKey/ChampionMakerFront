describe("Testing TypePage", () => {
  it("should load in basic web skeleton", () => {
    cy.visit("http://localhost:3000/types");
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in correct navbar", () => {
    cy.get(".nav").should("exist");
    cy.get("[data-cy=nav-login]").should("exist");
    cy.get("[data-cy=nav-register]").should("exist");
  });

  it("should load in Title", () => {
    cy.get(".champions-title").should("exist");
  });

  it("should load in all correct types", () => {
    cy.intercept("GET", "http://localhost:9000/api/types", {
      fixture: "types.json",
    });

    cy.get(".championlist-container").should("exist");
    cy.get(".typeCard-container").should("have.length", 9);

    //Check if the types card is loaded correctly
    cy.get("[data-cy=type-name]").first().should("have.text", "Assasin");
    cy.get("[data-cy=type-disc]")
      .first()
      .should(
        "have.text",
        "An Assassin is an agile champion that specializes in killing or disabling high value targets. Focused on infiltration, deception, and mobility, assassins are opportunistic hunters who find favorable moments within a fight before jumping into the fray."
      );
  });
});
