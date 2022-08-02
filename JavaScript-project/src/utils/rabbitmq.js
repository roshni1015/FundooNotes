var amqp = require('amqplib/callback_api');
import {SenderRabbitMQ} from './sentmail';
var emailid;
export const producer = (userdata) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = JSON.stringify(userdata);
            emailid = userdata.EmailID;
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
        
    });
}

const reicever = () => {
amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                let message = JSON.parse(msg.content)
                console.log(" [x] Received %s", message);
                SenderRabbitMQ(emailid);
            }, {
                noAck: true
            });
        });
    });
};
reicever();