const { v4: uuidv4 } = require('uuid');

const RABBITMQ = 'amqp://guest:guest@localhost:5672';

const open = require('amqplib').connect(RABBITMQ);
const q = 'example';

// Consumer
open
  .then(function (conn) {
    console.log(`[ ${new Date()} ] Server started`);
    return conn.createChannel();
  })
  .then(function (ch) {
    return ch.assertQueue(q).then(function (ok) {
      return ch.consume(q, function (msg) {
        console.log(
          `[ ${new Date()} ] Message received: ${JSON.stringify(
            JSON.parse(msg.content.toString('utf8')),
          )}`,
        );
        if (msg !== null) {
          const response = {
            uuid: uuidv4(),
          };

          console.log(
            `[ ${new Date()} ] Message sent: ${JSON.stringify(response)}`,
          );

          ch.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(response)),
            {
              correlationId: msg.properties.correlationId,
            },
          );

          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);
