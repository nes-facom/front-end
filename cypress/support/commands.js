import 'cypress-file-upload';

Cypress.Commands.add('login', (cpf, senha) => {
  cy.visit('/login')

  cy.get('[data-cy="input-cpf"]').type(cpf)
  cy.get('[data-cy="input-senha"]').type(`${senha}{enter}`)

  cy.url().should('include', '/emprestimos')
});

Cypress.Commands.add('cadastrarBibliotecario', (nome, cpf, senha, arquivo) => {
  cy.visit('/bibliotecario')

  cy.get('[data-cy="input-nome"]').type(nome)
  cy.get('[data-cy="input-cpf"]').type(cpf)
  cy.get('[data-cy="input-senha"]').type(senha)
  cy.get('[data-cy="input-confirmeSenha"]').type(senha)
  cy.get('[data-cy="input-dropzone"]').selectFile(arquivo, {force: true})

  cy.get('[data-cy="botao-continuar"]').click()
  
  cy.get('[data-cy="botao-fazerLogin"]').click()
});