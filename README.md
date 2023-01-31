![Logo](https://drive.google.com/uc?export=view&id=1WGIIz5TQMx6u3pf1dVbQtewXqPwleiQw)
# Sword - Tasks challenge

This project is developed with [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), [MongoDB](https://www.mongodb.com), [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org), [Tailwind](https://tailwindcss.com), [RabbitMq](https://www.rabbitmq.com), [Redis](https://redis.io), and containerized using [Docker - Docker compose](https://www.docker.com) and [Kubernetes](https://kubernetes.io/).

## Screenshot
![Logo](https://drive.google.com/uc?export=view&id=1pDyn8-gRBiU5aWGk8FvYe9S667af4y7T)

## Running the application

To run the application using docker, clone the repo, then run the command
```bash
  docker-compose up -d
```

To run the application using kubernetes, clone the repo, then run the commands
```bash
  kubectl apply -f k8s/deployment.yml
```
and

```bash
  kubectl apply -f k8s/service.yml
```

and the app should be working on http://localhost.


**Note:** for testing purposes, **5 Managers** and **20 Technicians** are created initially after the app starts.

You can login as a **Manager** with credentials :

**username:** manager01

**password:** manager01

Or as a **Technician** with credentials :

**username:** technician01

**password:** technician01


