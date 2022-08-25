"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redis_Notes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redisdatabase = require("../config/redisdatabase");

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var redis_Notes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var result, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _redisdatabase.client.get('AddNote');

          case 2:
            result = _context.sent;

            if (result) {
              data = JSON.parse(result);
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                data: data,
                message: "Fetched Notes Successfully"
              });
            } else {
              next();
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function redis_Notes(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.redis_Notes = redis_Notes;