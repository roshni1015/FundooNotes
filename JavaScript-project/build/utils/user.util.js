"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordHash = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var PasswordHash = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(Password) {
    var saltRounds, Hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            saltRounds = 10;
            _context.next = 3;
            return _bcrypt["default"].hash(Password, saltRounds);

          case 3:
            Hash = _context.sent;
            return _context.abrupt("return", Hash);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function PasswordHash(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.PasswordHash = PasswordHash;