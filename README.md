## SETEL ASSIGNMENT

Assignment for SETEL Backend engineer position. For the Order App I'm using NestJS and for the Payment App I'm using ExpressJS. Inside NestJS I implemented Events and Queus technique

## Requirements

- Node 14
- Git
- Docker

## Setup Redis and PostgreSQL

Redis for Queue and Jobs

```bash
docker run --name order-redis -p 6379:6379 -d redis
```

Postgres to store order data

```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

Pgadmin to view data (optional):

```bash
docker run --name pgadmin-nest -p 3001:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com'  -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret'  -d dpage/pgadmin4
```

## Application Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/farhan-helmy/setel-assignment.git

```

```bash
cd order-app
yarn install
yarn start:dev
```

App running at [http://localhost:3000](http://localhost:3000).

```bash
cd payment-app
yarn install
node src/index
```

App running at [http://localhost:5000](http://localhost:5000).

## To get started

Step 1: Open postman

Step 2: Send POST request to [http://localhost:3000/orders](http://localhost:3000/orders)

Example request body

```json
{
  "item_name": "barang-barang",
  "quantity": 2
}
```

Response

```json
{
  "item_name": "barang-barang",
  "quantity": 2,
  "status": "CREATED",
  "id": "29708768-91fe-4a45-89b8-a678982913bb"
}
```

Step 3: Check order success or not by sending GET request to [http://localhost:3000/orders/:id](http://localhost:3000/orders/:id) PS: \*Copy above id

Response if payment success

```json
{
  "id": "29708768-91fe-4a45-89b8-a678982913bb",
  "item_name": "barang-barang",
  "quantity": 2,
  "status": "DELIVERED"
}
```

Response if payment failed

```json
{
  "id": "29708768-91fe-4a45-89b8-a678982913bb",
  "item_name": "barang-barang",
  "quantity": 2,
  "status": "CANCELLED"
}
```

## Deploy using Kubernetes
