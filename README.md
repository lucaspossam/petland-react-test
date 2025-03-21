<p align="center"><img src="public/readme/logo.png" alt="Petland Front-end" width="700"></p>
<br />

# Teste Técnico - Desenvolvedor Front-end ReactJS

## Objetivo do Teste
O objetivo deste teste é avaliar os seus conhecimentos em React, boas práticas de programação, organização de código, performance e qualidade de código. Serão analisados os seguintes aspectos:
- Manipulação e uso de estados;
- Consumo de API;
- Componentização;
- Estruturação do projeto;
- Performance do código.

## Requisitos Técnicos
A aplicação base foi criada utilizando:
- [ViteJS](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)

Você pode adicionar ou alterar qualquer biblioteca que julgar necessária para a resolução do teste.

## Como Iniciar o Projeto
Para iniciar o projeto, siga os passos abaixo:
1. Utilize **npm**, **pnpm** ou **yarn** para gerenciar os pacotes;
2. Dentro da pasta do projeto, instale os pacotes necessários rodando o comando:
   ```sh
   npm install  # ou yarn install ou pnpm install
   ```
3. Para rodar o projeto, utilize o comando:
   ```sh
   npm run dev  # ou yarn dev ou pnpm dev
   ```

## Servidor JSON
O projeto inclui um servidor configurado com **json-server**. O arquivo `server.json` está localizado na raiz do projeto.

- Para iniciar o servidor, utilize o comando:
   ```sh
   npm run dev:server  # ou yarn dev:server ou pnpm dev:server
   ```
- O servidor estará disponível em: `http://localhost:3333/`

## Descrição do Projeto
Você deve desenvolver um **jogo da memória**, onde:
1. O usuário deve clicar em duas cartas;
2. Se forem iguais, elas permanecem viradas;
3. Se forem diferentes, devem ser viradas novamente;
4. Deve haver um botão para **reiniciar o jogo**, virando todas as cartas e "reembaralhando";
5. O jogador pode escolher o **número de pares**, sendo o mínimo de 2 pares;
6. A lista de cartas deve ser obtida da API local em `http://localhost:3333/cards`.
7. Você deve buscar os cartões disponíveis nessa API e renderizá-los **embaralhados** na tela, de acordo com a quantidade selecionada pelo jogador.
8. Você pode criar um script para embaralhar os cartões ou utilizar uma biblioteca.

O layout já está criado, mas você pode alterá-lo conforme desejar.
Você deve organizar o projeto da melhor forma possível, separando os componentes, criando hooks, etc.

## Configuração da API
O arquivo `src/services/api.ts` já contém o **axios** pré-configurado com um **delay** para simular uma requisição real. Você pode alterar ou remover esse delay, porém ele será considerado na avaliação do teste.

## Critérios de Avaliação
Serão considerados os seguintes critérios na avaliação:
- Uso de estados;
- Consumo de API;
- Organização do código;
- Componentização;
- Performance;
- Qualidade do código.

## Regras do Teste
1. Você deve **clonar o repositório** do projeto base;
2. Realizar as alterações necessárias;
3. Enviar o link do repositório atualizado para o email: `ti@petlandbrasil.com.br`.

## Diferenciais
Os seguintes itens serão considerados diferenciais:
- O estado atual do jogo ser mantido mesmo se o usuário atualizar a página;
- O jogo ser responsivo;
- Contador de tentativas;
- Sistema de pontuação.

## Dicas
- Todas as imagens estão na pasta `public/img`;
- Foram exportadas imagens dos cards já com as ilustrações;
- Também há arquivos com apenas as ilustrações e o card sem a ilustração;
- Você pode usar as imagens dos cards ou criar as cartas utilizando as ilustrações separadas, caso prefira;
- Faça commits para registrar o seu progresso, isso ajuda na organização e na compreensão das suas decisões de desenvolvimento.
