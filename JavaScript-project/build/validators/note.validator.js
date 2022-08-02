"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var NoteValidator = function NoteValidator(req, res, next) {
  var schema = _joi["default"].object({
    Title: _joi["default"].string().required(),
    Descreption: _joi["default"].string().required(),
    Color: _joi["default"].string().optional()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    next();
  }
};

exports.NoteValidator = NoteValidator;