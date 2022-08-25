"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.getAllUsers = exports.forgotPassword = exports.UserRegistration = exports.UserLogin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = require("../utils/nodemailer");

var _user2 = require("../utils/user.util");

var _rabbitmq = require("../utils/rabbitmq");

//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}(); //create new user


exports.getAllUsers = getAllUsers;

var UserRegistration = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var email, saltRounds, hashPassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              EmailID: body.EmailID
            });

          case 2:
            email = _context2.sent;

            if (!email) {
              _context2.next = 7;
              break;
            }

            throw new Error("Email Id already exits");

          case 7:
            saltRounds = 10;
            _context2.next = 10;
            return _bcrypt["default"].hash(body.Password, saltRounds);

          case 10:
            hashPassword = _context2.sent;
            //console.log("Hash Password", hashPassword);
            body.Password = hashPassword; //console.log("After Hashing req body", body);

            _context2.next = 14;
            return _user["default"].create(body);

          case 14:
            data = _context2.sent;
            (0, _rabbitmq.producer)(data);
            return _context2.abrupt("return", data);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function UserRegistration(_x) {
    return _ref2.apply(this, arguments);
  };
}(); //get single user


exports.UserRegistration = UserRegistration;

var UserLogin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userdata) {
    var data, match, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              EmailID: userdata.EmailID
            });

          case 2:
            data = _context3.sent;
            console.log("Data After Search", data);

            if (!(data != null)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 7;
            return _bcrypt["default"].compare(userdata.Password, data.Password);

          case 7:
            match = _context3.sent;

            if (!match) {
              _context3.next = 13;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              "Id": data._id,
              "FirstName": data.FirstName,
              "Email": data.EmailID
            }, process.env.SECRET_KEY);
            return _context3.abrupt("return", token);

          case 13:
            throw new Error("Invalid Password");

          case 14:
            _context3.next = 17;
            break;

          case 16:
            throw new Error("User Doesn't Exists");

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function UserLogin(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.UserLogin = UserLogin;

var forgotPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var data, token, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user["default"].findOne({
              "EmailID": body.EmailID
            });

          case 2:
            data = _context4.sent;

            if (!(data != null)) {
              _context4.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              EmailID: data.EmailID,
              _id: data._id
            }, process.env.FORGOT_KEY);
            console.log("Inside Service Token----->>", token);
            _context4.next = 8;
            return (0, _nodemailer.MailSender)(data.EmailID, token);

          case 8:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 12:
            throw new Error("Email not Exists");

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function forgotPassword(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var Hash, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //const saltRounds = 10;
            //const Hash = await bcrypt.hash(body.Password, saltRounds);
            console.log("Inside Service", body.Password);
            _context5.next = 3;
            return (0, _user2.PasswordHash)(body.Password);

          case 3:
            Hash = _context5.sent;
            body.Password = Hash;
            data = _user["default"].findOneAndUpdate({
              EmailID: body.EmailID
            }, {
              Password: body.Password
            }, {
              "new": true
            });
            return _context5.abrupt("return", data);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resetPassword(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;