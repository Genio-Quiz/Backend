# Sabichão Backend

A parte backend do projeto Sabichão.

- [**Como Abrir o projeto**](#como-abrir-o-projeto)
  - [**Clone o repositório do github localmente**](#clone-o-repositório-do-github-localmente)
  - [**Baixe as dependências**](#baixe-as-dependências)
  - [**Compile e rode o código**](#compile-e-rode-o-código)
  - [**Usando o docker**](#usando-o-docker)
- [**Como Commitar**](#como-commitar)

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

```bash
# development
$ npm run start

# watch mode (atualiza em tempo real)
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Usando o Docker

Para iniciar os contêineres, vá para a pasta raiz do projeto e verifique se você preencheu o seu arquivo .env, e use este comando:

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

