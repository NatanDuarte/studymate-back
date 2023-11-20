# Study Mate - Backend

Backend API for Final Year Practical Project.

## Running locally

peerjs --port 9000 --key peerjs --path /studymate

* install dependencies:

```shell
yarn install
```

* rename the file `config.example.json` (path: ./api/config) to
`config.json` and set your database credentials as well.

* create a .env file in the root directory with:

```shell
PORT=3000 # your application port
DEV_SECRET=some_really_difficult_secret_for_token_authentication
```

* then create the database and migrate:

```shell
npx sequelize db:create

npx sequelize db:migrate
```

* run dev environment

```shell
yarn dev
```

# Testing

You can test the endpoints using both postman collection and
environment provided [here](./postman/) (the `postman` folder).

### ⚠️ Dropping the database 💀

In case you need to drop the database to fix some issue on the tables,
run the following commands:

```shell
npx sequelize db:drop

npx sequelize db:create

npx sequelize db:migrate
```
