
# Urban Weather

Este projeto é uma aplicação web simples que permite que o usuário veja informações detalhadas sobre o clima e o horário de diversas cidades ao redor do mundo, além de oferecer uma interface para adicionar, editar e excluir cidades do banco de dados. Também aproveitou-se para testar o design conhecido como brutalista, com cores fortes e traços marcantes, como desafio extra. Este foi um trabalho feito para a disciplina de Experiência Criativa.

## Como funciona

Na Home, o usuário depara-se inicialmente com seis cards de cidade, que são pré-iniciados para a tela não ficar vazia. Ele pode escolher as cidades que gostaria de visualizar os dados ao digitar o nome delas separados por vírgulas e então clicar em buscar. Essa busca ficará salva no local storage, de forma que toda vez que o usuário voltar para a home, estas serão as cidades que serão exibidas para ele. Existe também um botão que permite mostrar os dados de todas as cidades cadastradas.

Quando o usuário clica na busca, o sistema busca a cidade no banco de dados, e, pelo nome dela e do país, faz a requisição via API para o site [OpenWeatherMap](https://openweathermap.org) para obter a última informação climática disponível do local. Nos cards de cidades da home, a parte acima da linha é puxada diretamente do banco de dados, enquanto que a parte debaixo vem da API. Para fins de visualização, os cards das cidades mudam de cor dependendo se for dia ou noite no local.

Todas as páginas possuem botões para navegação, para voltar para outras páginas e etc. Porém, o usuário também poderá sempre clicar no título para voltar para a home.

No final de todas as telas há um botão com o nome da autora, qque era requisito do trabalho. Este botão envia o usuário para a página do github da autora.

<img width="1835" height="958" alt="Image" src="https://github.com/user-attachments/assets/0891ce6b-95cb-4943-8c09-dda3dd644c0e" /><br>

Caso a cidade não exista no banco de dados, uma mensagem dizendo que ela não foi encontrada irá ser exibida na tela.

<img width="1835" height="958" alt="Image" src="https://github.com/user-attachments/assets/472a301a-907c-49ad-a66b-36adfd4e3619" /><br>

Caso a cidade exista no banco de dados, mas a API não tenha os dados disponíveis para ela, uma mensagem com essa informação será exibida para o usuário.

<img width="1835" height="958" alt="Image" src="https://github.com/user-attachments/assets/ebeb42af-8efd-4079-b0c0-66c7867b38a8" /><br>

Caso a cidade que o usuário queira saber os dados não esteja disponível na busca, ele poderá adicioná-la no banco de dados, clicando no botão de gerenciar as cidades. Na página de gerenciamento, é possível ver a lista completa de cidades presentes no banco de dados, e, caso queira, também poderá adicionar novas ou editar e deletar as existentes.

<img width="1835" height="958" alt="Image" src="https://github.com/user-attachments/assets/5e60eb5c-5304-4118-9abd-0128342ebd2e" /><br>

<img width="1835" height="958" alt="Image" src="https://github.com/user-attachments/assets/bff397e7-047e-463a-acaf-9c831ea2cff5" /><br>

Depois de incluída no banco de dados, o usuário pode novamente ir na home para buscar por ela, e então ver os dados, caso a API disponha desta informação. Como a API é em inglês, toda a aplicação foi feita nesta língua, pois não seria muito intuitivo para o usuário que a aplicação fosse em português, mas ele tivesse que escrever os nomes em inglês.

## Funcionalidades

*   **Gerenciamento Completo (CRUD):** A página de gerenciamento permite o usuário adicione novas cidades, edite dados de cidades existentes e as remova do banco de dados.
*   **Dados em Tempo Real:** As informações de clima (temperatura, umidade, vento) são obtidas através da API OpenWeatherMap.
*   **Banco de Dados MySQL:** Todas as informações de cidades são armazenadas de forma persistente em um banco de dados MySQL.

## Tecnologias Utilizadas

### Frontend:

*   **React:** Biblioteca para a construção da interface de usuário.
*   **Axios:** Cliente HTTP para fazer requisições à API e ao backend.
*   **React Router:** Para gerenciar a navegação entre as páginas.
*   **CSS:** Para estilização, com um design inspirado no estilo brutalista.

### Backend:

*   **Node.js:** Ambiente de execução do backend.
*   **Express.js:** Framework para criar a API REST.
*   **MySQL:** Sistema de gerenciamento de banco de dados relacional.

### API Externa:

*   **OpenWeatherMap:** API para buscar dados meteorológicos.

## Como Executar o Projeto

### Pré-requisitos

*   Node.js (versão 24.6.0)
*   npm (gerenciador de pacotes do Node.js)
*   MySQL (servidor de banco de dados)

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone git@github.com:ana-borowsky/cities_crud_weather_app.git
    ```
    
2.  **Instale as dependências:**

    Entre no diretório raiz do projeto e instale as dependências do backend:

    ```bash
    npm install
    ```
    
3.  **Inicie o Backend:**

    A partir do diretório raiz, inicie o servidor:

    ```bash
    npm start
    ```

4.  **Inicie o Frontend:**

    A partir do diretório raiz, inicie o servidor:

    ```bash
    npm run dev
    ```

5.  **Configure o banco de dados:**

    *   Importe o arquivo `database.sql` localizado no diretório raiz para criar e preencher o banco de dados com algumas cidades.


A aplicação estará acessível em `http://localhost:5173`
