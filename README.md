# Sabichão Backend

A parte backend do projeto Sabichão.

- [**Como Abrir o projeto**](#como-abrir-o-projeto)
  - [**Clone o repositório do github localmente**](#clone-o-repositório-do-github-localmente)
  - [**Baixe as dependências**](#baixe-as-dependências)
  - [**Compile e rode o código**](#compile-e-rode-o-código)
  - [**Usando o docker**](#usando-o-docker)
- [**Como Commitar**](#como-commitar)
- [**Branches**](#branches)
- [**Requests**](#requests)
  - [**Manipulação dos Usuários**](#manipulação-dos-usuários)
  - [**Cursos**](#cursos)
  - [**Disciplinas**](#disciplinas)

## Como Abrir o Projeto

### Clone o repositório do github localmente

```bash
$ git clone https://github.com/Genio-Quiz/Backend.git
```

### Baixe as dependências

```bash
$ npm install # também pode ser usado "npm i"
```

### Compile e rode o código
Você pode compilar o código e conectá-lo manualmente ao banco dados, mas é recomendado que você use o docker para fazer isso já que tudo é feito automáticamente para você. Isso é detalhado na [próxima seção](#usando-o-docker).
```bash
# development
$ npm run start

# watch mode (atualiza em tempo real)
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Usando o Docker

Para iniciar os contêineres, vá para a pasta raiz do projeto e verifique se você preencheu o seu arquivo .env. em seguida, utilize o comando abaixo para iniciar o docker.

Exemplo de um arquivo `.env`:
```
# DATABASE
DB_HOST=mysql
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=app_password
DB_ROOT_PASSWORD=rootpassword
DB_NAME=app_db

# APP
APP_PORT=3000
APP_DOCKER_PORT=3000

# JWT
SECRET="3IVJqcSZTLx19UNbzyq9wiDqK/1SPvBw4xzfUNgUCdtmj88TxOuI6k+SqLFk3v4OYM+RlQKyEuf9sGb68JrTNA"
```

```bash
# Esse comando vai criar o container e mapeá-lo ao porte definido no arquivo .env
$ docker compose up -d --build
```

## Como Commitar

Vá para a sua branch dev local e faça suas alterações:

```bash
# ir para a sua branch dev local
$ git checkout dev

# faça seus commits
$ git add .
$ git commit -m "<sua mensagem descritiva>"
```

Quando estiver pronto, crie uma pull request no github e passe as suas alterações para o repositório remoto com:

```bash
$ git push origin dev
```

Para finalizar, faça um merge da pull request para o main.

**Não se esqueça de dar um pull do main para o dev logo depois**, porque se você fizer outra alteração antes disso, o histórico de commits poderá ficar desorganizado:

```bash
# vá para a branch dev se você já não estiver nela
$ git checkout dev

# passe o merge da main para o dev
$ git pull origin main

# atualize a branch dev remota
$ git push origin dev
```

> Para mais informações sobre os comandos, acesse a [Documentação Oficial do Git](https://git-scm.com/docs) ou leia o livro online, [Pro Git](https://git-scm.com/book/en/v2).

## Branches
- `main`: Branch principal do projeto
- `dev`: Onde as features e alterações do código serão feitas
- `docs`: Onde serão feitas alterações relacionadas a documentação (como o README.md ou outros tipos de instrução)

## Requests
Use essas requests para manipular as tabelas do projeto

### Manipulação dos Usuários
- **`GET /users`**: Lista os usuários cadastrados
- **`GET /users/:id`**: Retorna o usuário com a id especificada
- **`GET /users/search/:username`**: Retorna o usuário com o nome especificado
- **`POST /auth/signUp`**: Cadastra um usuário no banco de dados
  ```
  {
    "username": "nome do usuário",
    "email": "email",
    "password": "senha",
    "isAdmin": true/false se for adiministrador
  }
  ```
- **`POST /auth/login`**: Entra em uma conta existente
  ```
  {
    "username": "nome do usuário",
    "password": "senha"
  }
  ```
- **`PATCH /users`**: Atualiza o usuário logado
  ```
  {
    "username?": "nome do usuário",
    "email?": "email",
    "password?": "senha",
    "isAdmin?": true/false se for adiministrador,
    "score?": número de pontos
  }
  ```
- **`DELETE /users`**: Deleta o usuário logado
### Cursos
- **`GET /cursos`**: Lista os cursos cadastrados
- **`GET /cursos/:id`**: Retorna o curso com a id especificada
- **`POST /cursos`**: Cadastra um curso no banco de dados
  ```
  {
    "nome": "nome do curso"
  }
  ```
- **`PATCH /cursos/:id`**: Atualiza um curso com a id especificada
  ```
  {
    "nome": "nome do curso"
  }
  ```
- **`DELETE /cursos/:id`**: Deleta um curso com a id especificada
### Disciplinas
- **`GET /disciplinas`**: Lista as disciplinas cadastradas
- **`GET /disciplinas/:id`**: Retorna a disciplina com a id especificada
- **`GET /disciplinas/search/:name`**: Retorna a disciplina com o nome especificado
- **`POST /disciplinas`**: Cadastra uma disciplina no banco de dados
  ```
  {
    "nome": "nome da disciplina",
    "cursoId": "id do curso relacionado"
  }
  ```
- **`PATCH /disciplinas/:id`**: Atualiza uma disciplina com a id especificada
  ```
  {
    "nome": "nome da disciplina",
    "cursoId": "id do curso relacionado"
  }
  ```
- **`DELETE /disciplinas/:id`**: Deleta uma disciplina com a id especificada