const amqplib = require('amqplib');
const { CLOUDAMQP_URL } = require('./index')

class MessageBroker {

    instance;

    constructor() {
    }

    static createInstance() {
        return new MessageBroker()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    consumeMessage = async (queue, callback) => {
        const connection = await amqplib.connect(CLOUDAMQP_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue, { durable: true })
        channel.consume(queue, data => {
            callback(JSON.parse(Buffer.from(data.content)))
            channel.ack(data);
        }, { noAck: false })
    }

    sendMessage = async (queue, data) => {
        const connection = await amqplib.connect(CLOUDAMQP_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue, { durable: true })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500)
    }

}

module.exports = MessageBroker.getInstance()
