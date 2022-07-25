Cypress.Commands.add("login", (email, password) => {
  cy.intercept("/api/users/login").as("login");
  cy.visit("http://localhost:3000/login");
  cy.get("[data-cy=login-email]").type(email);
  cy.get("[data-cy=login-password]").type(password);
  cy.get("[data-cy=login-submit]").click();
  cy.wait("@login");
});

Cypress.Commands.add("logout", () => {
  cy.visit("http://localhost:3000");
  cy.get("[data-cy=nav-logout]").click();
});
