![Logo](https://drive.google.com/uc?export=view&id=12oymGChp8fXin8ZTChwnprc57UZkRzO9)
# Tasks manager

This project is developed with [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), [MongoDB](https://www.mongodb.com), [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org), [Tailwind](https://tailwindcss.com), [RabbitMq](https://www.rabbitmq.com), [Redis](https://redis.io), and containerized using [Docker - Docker compose](https://www.docker.com) and [Kubernetes](https://kubernetes.io/).

![screenshot](https://drive.google.com/uc?export=view&id=1pDyn8-gRBiU5aWGk8FvYe9S667af4y7T)

## Important

For testing purposes, **5 Managers** and **20 Technicians** are created initially after the app starts.

You can login as a **Manager** with credentials :\
**username:** manager01\
**password:** manager01

Or as a **Technician** with credentials :\
**username:** technician01\
**password:** technician01

## Run the application

### Using docker compose
To run the application using docker compose, clone the repo, then run the command
```bash
  docker-compose up -d
```
The app should be working on http://localhost or http://localhost:80.


### Using kubernetes (Minikube)
To run the application using kubernetes, clone the repo, then start by deploying the config and secret files by running the commands :
```bash
  kubectl apply -f k8s/config.yml
```
and
```bash
  kubectl apply -f k8s/secret.yml
```

Then, in each folder of the services, run the commands :
```bash
  kubectl apply -f deployment.yml
```
and
```bash
  kubectl apply -f service.yml
```
**Note:** leave **server** and **mongo-express** for the last, they depend on other services.\

The app should be working on http://[YOUR_CLUSTER_IP]:31000.

## Run tests

To run the test of the React or Node.js application, access the app directory (client or server) and run: 
```bash
  npm run test
```


