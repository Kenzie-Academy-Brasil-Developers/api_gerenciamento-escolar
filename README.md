# api_gerenciamento-escolar

## navegação

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Endpoints](#3-endpoints)
- [Início Rápido](#4-início-rápido)
    - [Instalando Dependências](#41-instalando-dependências)
    - [Variáveis de Ambiente](#42-variáveis-de-ambiente)
    - [Migrations](#43-migrations)

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

A URL base da aplicação:
https://api-gerenciamento-escolar.herokuapp.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#navegação)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.  

![DER](https://uploaddeimagens.com.br/images/004/091/971/full/gerenciamento_escolar_XML.drawio_%283%29.png?1667655871)
---

## 3. Endpoints
[ Voltar para o topo ](#navegação)

confira todos os endpoints da API pela [documentação oficial](https://www.docker.com/)

## 4. Início Rápido
[ Voltar para o topo ](#navegação)


### 4.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn install
```

**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte comando:

````
yarn --version
````

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

````
npm install --global yarn
````
<br>

### 4.2. Run

a API já está com o **Docker** configurado por isso você precisa do **Docker** e **docker-compose** instalados na sua máquina.
Siga os passos abaixo para startar a API localmente:
```
docker-compose up --build
````

ou
```
docker compose up --build
```

O comando pode variar com a versão do docker compose instalada em sua máquina

***ATENÇÃO:*** a porta utilizada para rodar nosso docker é a `5436`.
Caso tenha algum problema com essa porta, basta alterá-la no docker-compose.yml.

### 4.3. Migrations

Execute as migrations com os comandos:
```
docker exec -it api yarn typeorm migration:run -d src/data-source.ts
```
