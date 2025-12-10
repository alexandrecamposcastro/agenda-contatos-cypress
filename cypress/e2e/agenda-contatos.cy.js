import { faker } from '@faker-js/faker';

describe('Teste Agenda de Contatos', () => {
  it('Cria, edita e deleta contato', () => {
    cy.visit('/');
    
    const contato = {
      nome: `Teste-${Date.now()}`,
      email: `teste${Date.now()}@teste.com`,
      telefone: '11 99999-9999'
    };

    // Cria contato
    cy.get('button.adicionar').click();
    cy.get('input[placeholder="Nome"]').type(contato.nome);
    cy.get('input[placeholder="E-mail"]').type(contato.email);
    cy.get('input[placeholder="Telefone"]').type(contato.telefone);
    
    // Tenta diferentes botões para salvar
    cy.get('button[type="submit"], button:contains("Salvar"), button:contains("Adicionar")').click();
    
    // Aguarda e verifica criação
    cy.contains(contato.nome, { timeout: 5000 }).should('be.visible');

    // Encontra posição do contato
    let posicaoContato = 0;
    cy.get('li').each(($li, index) => {
      if ($li.text().includes(contato.nome)) {
        posicaoContato = index;
      }
    });

    // Edita contato
    cy.get('button.edit').eq(posicaoContato).click();
    const nomeEditado = `Editado-${Date.now()}`;
    cy.get('input[placeholder="Nome"]').clear().type(nomeEditado);
    cy.get('button.alterar').click();
    
    // Verifica edição
    cy.contains(nomeEditado, { timeout: 5000 }).should('be.visible');

    // Deleta contato
    cy.get('button.delete').eq(posicaoContato).click();
    
    // Verifica exclusão
    cy.contains(nomeEditado).should('not.exist');
  });
});