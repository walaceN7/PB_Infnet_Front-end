# 📖 LêAí - Clube do Livro Interativo

**Projeto de Bloco: Desenvolvimento Front-end com Frameworks [25E2_5]**
**Aluno: Walace Abreu dos Santos Filho**

---

## 📚 Sobre o Projeto

LêAí é uma aplicação web interativa, no estilo clube do livro, que permite aos usuários gerenciar sua biblioteca pessoal, descobrir novos títulos e acompanhar seu progresso de leitura. O projeto foi desenvolvido como uma Single-Page Application (SPA) utilizando React, com foco em responsividade, interatividade e uma arquitetura moderna e escalável.

Esta aplicação foi construída como parte da avaliação do curso de Desenvolvimento Front-end com Frameworks, evoluindo desde a concepção inicial (TP1), passando pela primeira implementação visual (TP2), até a versão atual (TP3) com persistência de dados, autenticação e funcionalidades avançadas.

---

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Fluxo completo de cadastro e login, com persistência de sessão para que o usuário recupere sua sessão ao retornar.
- **Busca de Livros:** Integração com a Google Books API para pesquisar um vasto catálogo de livros por título ou autor.
- **Paginação:** A página de busca conta com um sistema de paginação para navegar por múltiplos resultados de forma eficiente.
- **Página de Detalhes:** Ao clicar em um livro, o usuário é direcionado para uma página com informações detalhadas, como sinopse completa, editora, ano de publicação e número de páginas.
- **Coleção Pessoal:** Os usuários podem adicionar livros à sua coleção pessoal, que é salva e vinculada à sua conta.
- **Gerenciamento de Leitura:** É possível alterar o status de cada livro na coleção ("Quero Ler", "Lendo", "Lido", "Desisti"), registrar o progresso de leitura e dar uma nota (de 1 a 5 estrelas) para os livros já lidos.
- **Design Responsivo (Mobile-First):** A interface foi construída com a filosofia Mobile-First, garantindo uma experiência de uso otimizada em dispositivos móveis e adaptável a telas maiores.
- **Feedback ao Usuário:** Notificações do tipo "toast" são utilizadas para dar feedback instantâneo sobre as ações realizadas (adicionar, remover, atualizar livro).

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js
- **Roteamento:** React Router DOM
- **Cliente HTTP:** Axios
- **Notificações:** React Hot Toast
- **Backend (Mock):** MockAPI
- **API de Dados:** Google Books API

---

## 🔧 Instalação e Execução

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/walaceN7/PB_Infnet_Front-end.git
    cd nome-do-projeto
    ```

2.  **Instale as dependências:**

    ```bash
    yarn install
    ```

3.  **Crie o arquivo de ambiente:**

    - Na raiz do projeto, crie um arquivo chamado `.env`.
    - Dentro dele, adicione a URL base da MockAPI. (O link da API vai estar no PDF)

    ```
    REACT_APP_API_URL=https://SUA_URL_DO_MOCKAPI.mockapi.io
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    yarn start
    ```
    O aplicativo será aberto automaticamente em `http://localhost:3000`.

---

## 🗺️ Backlog (Próximas Funcionalidades)

Este é o planejamento para as futuras evoluções do projeto, baseado na visão original e nas possibilidades de expansão.

#### Novas Funcionalidades (Features)

- **[Feature] - Implementar Feed de Amigos:** Substituir os dados fictícios da página de Feed por uma lógica real, buscando atividades de outros usuários na API.
- **[Feature] - Sistema de "Seguir" Usuários:** Permitir que um usuário siga outros para ver suas atividades no feed.

#### Questões Técnicas / Refactoring

- **[Técnico] - Criar Testes Unitários:** Escrever testes para os `services` e para o hook `useBuscaDeLivros` para garantir a estabilidade do código.
- **[Técnico] - Utilizar Context API:** Refatorar o gerenciamento do estado do `usuario` para utilizar a Context API do React, evitando a necessidade de passar a prop por múltiplos níveis de componentes.

---

## 👨‍💻 Autor

**Walace Abreu dos Santos Filho**

- **LinkedIn:** https://www.linkedin.com/in/walace-abreu/
- **GitHub:** https://github.com/walaceN7
