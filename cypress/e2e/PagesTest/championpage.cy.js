describe("Testing ChampionPage", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:9000/api/champions/name-Anivia", {
      fixture: "champion.json",
    });
    cy.visit("http://localhost:3000/champions/name-Anivia");
  });
  it("should load in basic web skeleton", () => {
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content-champion").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in correct navbar", () => {
    cy.get(".nav").should("exist");
    cy.get("[data-cy=nav-login]").should("exist");
    cy.get("[data-cy=nav-register]").should("exist");
  });

  it("should't be able to see delete button", () => {
    cy.get("[data-cy=champ-delete]").should("not.exist");
  });

  it("should't be able to see edit button", () => {
    cy.get("[data-cy=champ-edit]").should("not.exist");
  });

  it("should't be able to see upvote button", () => {
    cy.get("[data-cy=champ-upvote]").should("not.exist");
  });

  it("should load all fields correctly from chosen champion", () => {
    cy.get("[data-cy=champ-user]").should("has.text", "Efe");
    cy.get("[data-cy=champ-type]").should("has.text", "Mage");
    cy.get("[data-cy=champ-rating]").should("has.text", "15");
    cy.get("[data-cy=champ-name]").should("has.text", "Anivia");
    cy.get("[data-cy=champ-lore]").should(
      "has.text",
      "Anivia is a benevolent winged spirit who endures endless cycles of life, death, and rebirth to protect the Freljord. A demigod born of unforgiving ice and bitter winds, she wields those elemental powers to thwart any who dare disturb her homeland. Anivia guides and protects the tribes of the harsh north, who revere her as a symbol of hope, and a portent of great change. She fights with every ounce of her being, knowing that through her sacrifice, her memory will endure, and she will be reborn into a new tomorrow."
    );
  });
});

describe("Testing ChampionPage after Login", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:9000/api/champions/name-Anivia", {
      fixture: "champion.json",
    });
    cy.login("aba@api.be", "Aba1907.");
    cy.visit("http://localhost:3000/champions/name-Anivia");
  });

  it("should load in basic web skeleton", () => {
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content-champion").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in correct navbar", () => {
    cy.get(".nav").should("exist");
    cy.get("[data-cy=nav-login]").should("not.exist");
    cy.get("[data-cy=nav-register]").should("not.exist");
    cy.get("[data-cy=nav-collection]").should("exist");
    cy.get("[data-cy=nav-logout]").should("exist");
  });

  it("should't be able to see delete, edit button", () => {
    cy.get("[data-cy=champ-delete]").should("not.exist");
    cy.get("[data-cy=champ-edit]").should("not.exist");
  });

  it("should be able to see upvote button and upvote", () => {
    cy.get("[data-cy=champ-upvote]").should("exist");
    cy.get("[data-cy=champ-upvote]").click();
    cy.get("[data-cy=champ-rating]").should("exist");
  });

  it("should load all fields correctly from chosen champion", () => {
    cy.get("[data-cy=champ-user]").should("has.text", "Efe");
    cy.get("[data-cy=champ-type]").should("has.text", "Mage");
    cy.get("[data-cy=champ-rating]").should("has.text", "15");
    cy.get("[data-cy=champ-name]").should("has.text", "Anivia");
    cy.get("[data-cy=champ-lore]").should(
      "has.text",
      "Anivia is a benevolent winged spirit who endures endless cycles of life, death, and rebirth to protect the Freljord. A demigod born of unforgiving ice and bitter winds, she wields those elemental powers to thwart any who dare disturb her homeland. Anivia guides and protects the tribes of the harsh north, who revere her as a symbol of hope, and a portent of great change. She fights with every ounce of her being, knowing that through her sacrifice, her memory will endure, and she will be reborn into a new tomorrow."
    );
  });
});

describe("Testing ChampionPage of Owned champion after Login", () => {
  beforeEach(() => {
    cy.login("aba@api.be", "Aba1907.");
    cy.intercept("GET", "http://localhost:9000/api/champions/name-Test", {
      fixture: "champOwned.json",
    });
    cy.visit("http://localhost:3000/champions/name-Test");
  });

  it("should load in basic web skeleton", () => {
    cy.get(".containerBody").should("exist");
    cy.get(".sidebar-left").should("exist");
    cy.get(".sidebar-rigth").should("exist");
    cy.get(".content-champion").should("exist");
    cy.get("footer").should("exist");
  });

  it("should load in correct navbar", () => {
    cy.get(".nav").should("exist");
    cy.get("[data-cy=nav-login]").should("not.exist");
    cy.get("[data-cy=nav-register]").should("not.exist");
    cy.get("[data-cy=nav-collection]").should("exist");
    cy.get("[data-cy=nav-logout]").should("exist");
  });

  it("should be able to see delete, edit, upvote button", () => {
    cy.get("[data-cy=champ-delete]").should("exist");
    cy.get("[data-cy=champ-edit]").should("exist");
    cy.get("[data-cy=champ-upvote]").should("exist");
  });

  it("should be able to upvote", () => {
    cy.get("[data-cy=champ-upvote]").click();
    cy.get("[data-cy=champ-rating]").should("exist");
  });

  it("should be able to edit disc and type", () => {
    cy.get("[data-cy=champ-edit]").click();
    cy.get("[data-cy=update-disc]").type("test disc");
    cy.get("[data-cy=update-type]").type("Tank");
    cy.get("[data-cy=update-close]").click();
  });

  it("should load all fields correctly from chosen champion", () => {
    cy.get("[data-cy=champ-user]").should("has.text", "Aba");
    cy.get("[data-cy=champ-type]").should("has.text", "Healer");
    cy.get("[data-cy=champ-rating]").should("has.text", "10");
    cy.get("[data-cy=champ-name]").should("has.text", "Test");
    cy.get("[data-cy=champ-lore]").should("exist");
  });

  it("should be able to delete champion", () => {
    //Delete request stubben want anders delete ik de echte champion
    cy.intercept(
      "DELETE",
      "http://localhost:9000/api/users/Aba/champions/Test",
      {
        fixture: "deleteChamp.json",
      }
    );
    cy.get("[data-cy=champ-delete]").click();
    cy.url().should("eq", "http://localhost:3000/collection/Aba/champions");
  });
});
