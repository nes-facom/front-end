describe('Fazer login', () => {
  beforeEach(() => {
      cy.visit('/login')
  });

  it('CPF e senha vazios não fazem login', () => {
      cy.get('[data-cy="botao-login"]').click()
      cy.url().should('include', '/login')
  });

  const T0 = [
      { cpf: '           ', senha: '12345678', resultado: 'inválido' },
      { cpf: '000’hj698749', senha: '12345678', resultado: 'inválido' },
      { cpf: '12345678901', senha: 'abc12', resultado: 'inválido' },
      { cpf: '12345678901', senha: 'abc12 789', resultado: 'inválido' },
      { cpf: '123456789012', senha: 'abc12345', resultado: 'inválido' },
      { cpf: '12345678901', senha: 'S3nh45@#', resultado: 'inválido' },
  ];

  T0.forEach((test) => {
      it(`CPF ${test.cpf} e senha ${test.senha} possuem login ${test.resultado}`, () => {
          cy.get('[data-cy="input-cpf"]').type(test.cpf)
          cy.get('[data-cy="input-senha"]').type(test.senha)
          cy.get('[data-cy="botao-login"]').click()
          cy.url().should('include', '/login')
      });
  });

  const T1 = { nome: 'Ana Beatriz Oliveira', cpf: '12345678901', senha: 'S3nh45@#', resultado: 'válido' };

  it('Cadastrar bibliotecário', function () {
    cy.cadastrarBibliotecario(T1.nome, T1.cpf, T1.senha, 'cypress/fixtures/senha_admin.txt')
  });

  it(`CPF ${T1.cpf} e senha ${T1.senha} possuem login ${T1.resultado}`, () => {
      cy.get('[data-cy="input-cpf"]').type(T1.cpf)
      cy.get('[data-cy="input-senha"]').type(T1.senha)
      cy.get('[data-cy="botao-login"]').click()
      cy.url().should('include', '/emprestimos')
  });
});