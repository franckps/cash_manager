# cash_manager

App for helps people to manage their money

For run the server locally you only need to

## 1. Clone the repo

```
git clone https://github.com/franckps/cash_manager.git
```

## 2. Run the server

### 2.1. By the docker-compose

If you have the docker-compose installed in your computer, you can run only

```
npm run start-container
```

And when the message above appear in your terminal, the server is up

```
App is listening on 3000
```

### 2.2. Or without docker-compose

In case of you have no docker-compose installed, you need to run

```
npm ci
```

To install all the necessary package from package-lock.json file definitions.

Then you can start the server by running the following command

```
npm start
```

And when the message above appear in your terminal, the server is up

```
App is listening on 3000
```

## Request cUrls:

### Create new Transaction

curl --location 'http://localhost:3000/api/v1/' \
--header 'Content-Type: application/json' \
--data '{
"amount": "10",
"type": "Receipt",
"title": "Conta",
"description": "Teste inicial"
}'
