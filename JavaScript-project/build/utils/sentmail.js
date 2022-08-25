"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SenderRabbitMQ = SenderRabbitMQ;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var nodemailer = require('nodemailer');

var _require = require('googleapis'),
    google = _require.google;

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URI = process.env.REDIRECT_URI;
var REFRESH_TOKEN = process.env.REFRESH_TOKEN;
var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

function SenderRabbitMQ(_x) {
  return _SenderRabbitMQ.apply(this, arguments);
}

function _SenderRabbitMQ() {
  _SenderRabbitMQ = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(EmailID) {
    var accessToken, transport, mailOptions, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return oAuth2Client.getAccessToken();

          case 3:
            accessToken = _context.sent;
            transport = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_ID,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
              }
            });
            mailOptions = {
              from: process.env.EMAIL_ID,
              to: EmailID,
              subject: 'User Registration',
              text: 'User Registration Successfully done'
            };
            _context.next = 8;
            return transport.sendMail(mailOptions);

          case 8:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _SenderRabbitMQ.apply(this, arguments);
}