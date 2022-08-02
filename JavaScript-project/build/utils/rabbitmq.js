"use strict";

var _sentmail = require("./sentmail");

var amqp = require('amqplib/callback_api');

var emailid;

function producer(userdata) {
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
      console.log("Inside rabbitmq----->>", emailid);
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
      connection.close();
    }, 1000);
  });
}

function Consumer() {
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
        console.log("[X] Received %5", message);
        (0, _sentmail.sentmail)(emailid);
      }, {
        noAck: true
      });
    });
  });
}

;
producer();