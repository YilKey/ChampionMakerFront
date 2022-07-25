describe("Testing HomePage", () => {
  it("should load in basic web sceleton", () => {
    cy.visit("http://localhost:3000");
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

  it("should load in top rated champions lbl's", () => {
    cy.get(".home-champions-title").should("exist");
  });

  it("should load in top rated championCards in correct order", () => {
    cy.intercept("GET", "http://localhost:9000/api/champions", {
      fixture: "homeChampions.json",
    });
    //First champion card in the list
    cy.get(".championlist-container").should("exist");
    cy.get(".championCard-container").should("have.length", 10);
    cy.get("[data-cy=champ-rating]").first().should("have.text", "1654");
    cy.get("[data-cy=champ-name]").first().should("have.text", "Zed");
    cy.get("[data-cy=champ-user]").first().should("have.text", "Berfin");
    cy.get("[data-cy=champ-type]").first().should("have.text", "Assasin");

    //Last champion card in the list
    cy.get("[data-cy=champ-rating]").last().should("have.text", "0");
    cy.get("[data-cy=champ-name]").last().should("have.text", "LeBlanc");
    cy.get("[data-cy=champ-user]").last().should("have.text", "Kerem");
    cy.get("[data-cy=champ-type]").last().should("have.text", "Assasin");
  });
});

describe("Testing HomePage after Login", () => {
  beforeEach(() => {
    cy.login("aba@api.be", "Aba1907.");
  });
  it("should load in basic web sceleton", () => {
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in correct navbar", () => {
    cy.get(".nav").should("exist");
    cy.get("[data-cy=nav-login]").should("not.exist");
    cy.get("[data-cy=nav-register]").should("not.exist");
    cy.get("[data-cy=nav-collection]").should("exist");
    cy.get("[data-cy=nav-logout]").should("exist");
  });
});
