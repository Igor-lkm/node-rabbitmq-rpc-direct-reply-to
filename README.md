## Example of RabbitMQ RPC Direct reply-to with node.js

Details: [Docs on RabbitMQ](https://www.rabbitmq.com/direct-reply-to.html)

### How to start

1) RabbitMQ is required (e.g. with docker)

```
docker run -p 5672:5672 rabbitmq:3
```

2) Install packages

```
npm i
```

3) Start server

```
node server.js
```

4) Execute client request

```
node client.js
```
