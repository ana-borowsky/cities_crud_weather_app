
# Urban Weather

Este projeto é uma aplicação web simples que permite que os usuários vejam informações detalhadas sobre o clima e o horário de diversas cidades ao redor do mundo, além de oferecer uma interface para adicionar, editar e excluir cidades do banco de dados. Este foi um trabalho simples feito para a disciplina de Experiência Criativa, e, por isso, aproveitei a chance para testar um tipo de design bem diferente, conhecido por brutalismo.

## Como funciona

Na Home, o usuário pode escolher que cidades gostaria de visualizar os dados ao digitar o nome delas separados por vírgulas e então clicar em buscar. Ao acessar a Home, o usuário se depara inicialmente com seis cidades pré-selecionadas. Existe um botão que permite mostrar os dados de todas as cidades cadastradas.

Quando o usuário clica na busca, o sistema busca a cidade no banco de dados, e, pelo nome dela e do país, faz a requisição via API para o site OpenWeather para a obtenção da última informação climática do local. A API também fornece os dados de fuso-horário, o que permite mostrar também o horário local da cidade. Para fins de visualização, os cards das cidades mudam de cor dependendo se for dia ou noite.

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/5ef1369d-1346-4c23-a8a7-66d26bb99d7a" /><br>

Caso a cidade não exista no banco de dados, uma mensagem dizendo que ela não foi encontrada irá aparecer.

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/905f0f86-55c6-4848-8ca2-8ed17d3119ae" /><br>

Caso a cidade exista no banco de dados, mas a API não tenha os dados disponíveis para ela, uma mensagem com essa informação será exibida para o usuário.

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/2524f575-b321-4170-a661-16d6c0938e58" /><br>

Caso a cidade que o usuário queira saber os dados não esteja disponível na busca, ele poderá adicioná-la no banco de dados, clicando no botão de gerenciar as cidades. Na página de gerenciamento, é possível ver a lista completa, adicionar, deletar ou editar as cidades.

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/ead8843b-65be-430d-abbc-f3f143fe2c75" /><br>

<img width="1834" height="954" alt="Image" src="https://github.com/user-attachments/assets/ce9c6dd8-5c8d-45bd-a6c5-b6e95416b30c" /><br>

Depois de incluída no banco de dados, o usuário pode novamente ir na Home para buscar por ela, e então ver os dados, caso a API disponha desta informação. Como a API é em inglês, toda a aplicação foi feita nesta língua, pois achei que seria estranho pedir pro usuário escrever o nome da cidade em inglês sendo a aplicação em português.

Todas as páginas possuem botões para navegação, para voltar para outras páginas e etc. Porém, o usuário também poderá sempre clicar no título para voltar para a Home. A última busca de cidades feita pelo usuário é salva no local storage, e sempre que ele voltar para a Home, são estas as cidades que serão mostradas.

No final de todas as telas há um botão com o meu nome, que foi requisitado pelo professor que estivesse presente. Este botão envia o usuário para a página a minha página do github.

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
