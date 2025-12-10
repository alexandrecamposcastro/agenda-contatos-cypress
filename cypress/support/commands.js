// Comandos personalizados podem ser adicionados aqui
Cypress.Commands.add('adicionarContato', (nome, telefone, email) => {
  cy.get('button[type="button"]').contains('Novo Contato').click();
  cy.get('input[name="nome"]').type(nome);
  cy.get('input[name="telefone"]').type(telefone);
  cy.get('input[name="email"]').type(email);
  cy.get('button[type="submit"]').click();
});