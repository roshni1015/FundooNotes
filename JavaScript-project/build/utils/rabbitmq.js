"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.producer = void 0;

var _sentmail = require("./sentmail");

var amqp = require('amqplib/callback_api');

var emailid;

var producer = function producer(userdata) {
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
};

exports.producer = producer;

var consumer = function consumer() {
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
        var message = JSON.parse(msg.content);
        console.log(" [x] Received %s", message);
        (0, _sentmail.SenderRabbitMQ)(emailid);
      }, {
        noAck: true
      });
    });
  });
};

consumer();