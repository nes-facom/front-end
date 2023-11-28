# Librix - Gerenciador de Biblioteca - Front-end

## Descrição do projeto

### Contexto:
No contexto de uma escola municipal, a biblioteca enfrenta desafios significativos devido ao grande volume de alunos e à gestão manual da entrada e saída de livros. Atualmente, a administração desses processos é realizada por uma única pessoa, o que torna a gestão de empréstimos, devoluções e atrasos precária e suscetível a erros.

### Problema:
O principal problema identificado é a ineficiência do sistema de gerenciamento da biblioteca, que depende exclusivamente de registros manuais em cadernos. A sobrecarga de trabalho para a pessoa responsável resulta em atrasos, extravios de livros e dificuldades na comunicação com os alunos. A falta de automação também impacta a capacidade de realizar análises eficientes sobre o uso da biblioteca e o comportamento de empréstimos.

### Solução Proposta:
Para superar esses desafios, a proposta é desenvolver um software que automatize todo o processo de gestão da biblioteca. O software irá permitir o cadastro de alunos, registro de empréstimos, controle de devoluções e alertas automáticos para atrasos. A introdução dessa solução não apenas aumentará a eficiência operacional, mas também proporcionará uma gestão mais transparente e eficaz dos recursos da biblioteca, melhorando a experiência dos alunos e facilitando a vida do pessoal responsável pela administração.

## Requisitos

- Instalar [NodeJS](https://nodejs.org/en) 20.9.0 ou superior.
- Instalar [Git](https://git-scm.com/downloads) 2.42.0 ou superior.

## Ambiente de Desenvolvimento

1. Instale o editor de código de sua preferência.
2. Abra o terminal _Git Bash_ em um diretório qualquer.
3. Faça a configuração inicial no terminal _Git Bash_ rodando os seguintes comandos:

```sh
  git config --global user.name seu_username_do_git
```

```sh
  git config --global user.email seu_email_do_git
```

4. Clone o repositório **front-end**. No terminal _Git Bash_ execute:

```sh
git clone https://github.com/PDS-1-P05/2023_1_front-end.git
```

5. No terminal, entre no diretório do projeto clonado executando:

```sh
  cd front-end
```

6. Após a finalização da clonagem, ainda no _Git Bash_, migre para a branch _develop_ executando o comando:

```sh
git checkout develop
```

7. Atualize os arquivos do repositório local com o comando:

```sh
git pull origin develop
```

8. Ao terminar de atualizar o projeto, abra o repositório local no editor escolhido.
9. Na pasta "**front-end**" existe uma pasta chamada _"config"_ contendo um arquivo _"config.js"_, crie (ou apenas renomeie) a pasta e o arquivo com nomes _"config"_ e _"config.js"_ e altere o link do _"BASE_URL"_ do arquivo _"config.js"_ para o link da variável de ambiente de desenvolvimento localizado na seção abaixo.
10. Abra o terminal de sua preferência (CMD, Powershell ou do próprio editor) e acesse o diretório _“front-end”_.
11. Para instalar as dependências do projeto, no terminal, execute o seguinte comando:

```sh
npm install
```

12. Ainda no terminal, para inicializar o localhost execute:

```sh
npm run dev
```

13. Vai ser exibido uma mensagem pop-up que gera um certificado digital com uma chave SSL para que o link gerado pelo _"npm run dev"_, seja HTTPS, basta clicar em SIM.
14. Abra o localhost em qualquer navegador (https://localhost:5173).

## Variaveis de Ambiente de Desenvolvimento

| Variavel   | Valor                   |
| ---------- | ----------------------- |
| <BASE_URL> | <http://localhost:3000> |

## Recomendações

- Editor: VSCode.
- Programas: Postman.
- Extensões VSCode: Git Graph, Postman, Thunder Client, GitHub Pull Requests and Issues, Vue VSCode Snippets e JavaScript (ES6) code snippets.

<br>

## Estrutura do Sistema

```
// Gerar Estrutura

```

## Autores e histórico

Este sistema foi desenvolvido pela seguinte equipe:

- João Lucas Silva Machado: (joao_machado@ufms.br)
- Matheus Silva Oliveira: (matheus_oliveira@ufms.br)
- Lucas Borth: (lucas_borth@ufms.br)
- Isadora Picoli: (isadora.picoli@ufms.br)
- Vítor Hugo Cassol: (vitor.cassol@ufms.br)
- Henrique Yule: (henrique.y@ufms.br)

Orientado pelo professor Rodrigo Funabashi Jorge e proposto por Alesandra  e Aldivina S E Martinez.
