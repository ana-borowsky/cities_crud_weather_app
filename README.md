
# Urban Weather

Este projeto é uma aplicação web simples que permite que os usuários vejam informações detalhadas sobre o clima e o horário de diversas cidades ao redor do mundo, além de oferecer uma interface para adicionar, editar e excluir cidades do banco de dados. Este foi um trabalho simples feito para a disciplina de Experiência Criativa, que também aproveitou-se a chance para trabalhar com um estilo de design bem exagerado, conhecido como brutalismo.

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/5ef1369d-1346-4c23-a8a7-66d26bb99d7a" /><br>

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/ead8843b-65be-430d-abbc-f3f143fe2c75" /><br>

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/ce9c6dd8-5c8d-45bd-a6c5-b6e95416b30c" /><br>

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/905f0f86-55c6-4848-8ca2-8ed17d3119ae" /><vr>



## Funcionalidades

*   **Página Inicial Dinâmica:** Exibe cards de cidades em destaque com informações de clima e hora local. O usuário pode filtrar as cidades exibidas por nome.
*   **Gerenciamento Completo (CRUD):** A página de gerenciamento permite que você adicione novas cidades, edite dados de cidades existentes e as remova do banco de dados.
*   **Dados em Tempo Real:** As informações de clima (temperatura, umidade, vento) e hora local são obtidas através da API OpenWeatherMap.
*   **Banco de Dados MySQL:** Todas as informações de cidades são armazenadas de forma persistente em um banco de dados MySQL.
*   **Interface Responsiva:** O design se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência em dispositivos móveis e desktops.

## Tecnologias Utilizadas

### Frontend:

*   **React:** Biblioteca para a construção da interface de usuário.
*   **Axios:** Cliente HTTP para fazer requisições à API e ao backend.
*   **React Router:** Para gerenciar a navegação entre as páginas.
*   **CSS:** Para estilização, com um design inspirado no estilo neobrutalista.

### Backend:

*   **Node.js:** Ambiente de execução do backend.
*   **Express.js:** Framework para criar a API REST.
*   **MySQL:** Sistema de gerenciamento de banco de dados relacional.

### API Externa:

*   **OpenWeatherMap:** API para buscar dados meteorológicos e de fuso horário.

## Como Executar o Projeto

Siga os passos abaixo para colocar o projeto a funcionar na sua máquina:

### Pré-requisitos

*   Node.js (versão 24.6.0)
*   npm (gerenciador de pacotes do Node.js)
*   MySQL (servidor de banco de dados)

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone git@github.com:ana-borowsky/cities_crud_weather_app.git
    cd git@github.com:ana-borowsky/cities_crud_weather_app.git
    ```

2.  **Instale as dependências:**



    No diretório raiz do projeto, instale as dependências do backend:

    ```bash
    npm install
    ```

4.  **Configure o banco de dados:**

    *   Importe o arquivo `database.sql` para criar e preencher o banco de dados com algumas cidades.

5.  **Inicie o Backend:**

    A partir do diretório raiz, inicie o servidor:

    ```bash
    npm start
    ```


A aplicação estará acessível em `http://localhost:5173`
