"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    FirstName: _joi["default"].string().min(4).required(),
    LastName: _joi["default"].string().min(4).required(),
    EmailID: _joi["default"].string().email().required(),
    Password: _joi["default"].string().min(8).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
    next(error);
  } else {
    next();
  }
};

exports.newUserValidator = newUserValidator;