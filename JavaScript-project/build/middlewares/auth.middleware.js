"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuther = exports.userAuth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var userAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('Authorization'); //console.log("Bearer token---->>>>",bearerToken);

            if (bearerToken) {
              _context.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1]; //console.log("After Split bearerToken" , bearerToken);

            _context.next = 7;
            return _jsonwebtoken["default"].verify(bearerToken, process.env.SECRET_KEY);

          case 7:
            user = _context.sent;
            //console.log("User Details After Verification" , user.Email);
            req.body.UserID = user.Email;
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            res.status(_httpStatusCodes["default"].UNAUTHORIZED).json({
              code: _httpStatusCodes["default"].UNAUTHORIZED,
              message: "".concat(_context.t0)
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function userAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.userAuth = userAuth;

var userAuther = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var bearertoken, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            bearertoken = req.params.token;
            console.log("Bearer token---->>>>", bearertoken);

            if (bearertoken) {
              _context2.next = 5;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 5:
            _context2.next = 7;
            return _jsonwebtoken["default"].verify(bearertoken, process.env.FORGOT_KEY);

          case 7:
            user = _context2.sent;
            req.body.EmailID = user.EmailID;
            next();
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            res.status(_httpStatusCodes["default"].UNAUTHORIZED).json({
              code: _httpStatusCodes["default"].UNAUTHORIZED,
              message: "".concat(_context2.t0)
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function userAuther(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userAuther = userAuther;