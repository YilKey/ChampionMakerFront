describe("Testing SearchPage", () => {
  it("should load in basic web sceleton", () => {
    cy.visit("http://localhost:3000/champions");
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

  it("should load in Searchbar", () => {
    cy.get(".champions-searchBar").should("exist").should("have.text", "");
  });

  it("should load in all championCards in alphabetic order", () => {
    cy.intercept("GET", "http://localhost:9000/api/champions", {
      fixture: "homeChampions.json",
    });

    //First champion card in the list should start with A
    cy.get(".championlist-container").should("exist");
    cy.get(".championCard-container").should("have.length", 10);
    cy.get("[data-cy=champ-rating]").first().should("have.text", "15");
    cy.get("[data-cy=champ-name]").first().should("have.text", "Anivia");
    cy.get("[data-cy=champ-user]").first().should("have.text", "Efe");
    cy.get("[data-cy=champ-type]").first().should("have.text", "Mage");
  });

  it("should be able to type in the searchbar", () => {
    cy.get(".champions-searchBar").type("test");
    cy.get(".champions-searchBar").clear();
  });

  it("should give no champion card if not exist", () => {
    cy.get(".champions-searchBar").type("this champion doesn't exist");
    cy.get(".championCard-container").should("have.length", 0);
    cy.get(".champions-searchBar").clear();
  });

  it("should give correct champion card if exists", () => {
    cy.intercept("GET", "http://localhost:9000/api/champions", {
      fixture: "homeChampions.json",
    });

    cy.get(".champions-searchBar").type("Anivia");
    cy.get(".championCard-container").should("have.length", 1);
    cy.get("[data-cy=champ-rating]").first().should("have.text", "15");
    cy.get("[data-cy=champ-name]").first().should("have.text", "Anivia");
    cy.get("[data-cy=champ-user]").first().should("have.text", "Efe");
    cy.get("[data-cy=champ-type]").first().should("have.text", "Mage");
    cy.get(".champions-searchBar").clear();
  });
});
