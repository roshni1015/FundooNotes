"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailSender = MailSender;

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

function MailSender(_x, _x2) {
  return _MailSender.apply(this, arguments);
} // SendMail()
// .then((result) => console.log('Email Sent---->', result))
// .catch((error) => console.log(error.message));


function _MailSender() {
  _MailSender = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(EmailID, token) {
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
                user: 'roshniadatrao@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
              }
            });
            mailOptions = {
              from: 'Roshni# <roshniadatrao@gmail.com>',
              to: EmailID,
              subject: 'Hello from gmail using API',
              text: 'Hello this is the mail from gmail using API',
              html: "<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href=\"http://localhost:".concat(process.env.APP_PORT, "/api/v1/users/").concat(token, "\">click here</a></h1>")
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
  return _MailSender.apply(this, arguments);
}