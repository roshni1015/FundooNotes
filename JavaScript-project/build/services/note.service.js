"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotes = exports.isTrash = exports.getNote = exports.getAllNotes = exports.deleteNotes = exports.archiveNotes = exports.AddNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redisdatabase = require("../config/redisdatabase");

var _note = _interopRequireDefault(require("../models/note.model"));

var AddNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _note["default"].create(body);

          case 2:
            data = _context.sent;

            if (!data) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return _redisdatabase.client.del('AddNote');

          case 6:
            return _context.abrupt("return", data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function AddNote(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.AddNote = AddNote;

var getAllNotes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _note["default"].find({
              UserID: req.UserID
            });

          case 2:
            data = _context2.sent;

            if (data) {
              _redisdatabase.client.set('AddNote', JSON.stringify(data));
            }

            return _context2.abrupt("return", data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllNotes(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllNotes = getAllNotes;

var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _note["default"].findById({
              _id: _id,
              UserID: body.UserID
            });

          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNote(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNote = getNote;

var updateNotes = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserID: body.UserID
            }, body, {
              "new": true
            });

          case 2:
            data = _context4.sent;
            _context4.next = 5;
            return _redisdatabase.client.del('AddNote');

          case 5:
            return _context4.abrupt("return", data);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNotes(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNotes = updateNotes;

var deleteNotes = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_id, UserID) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _note["default"].findByIdAndDelete({
              _id: _id,
              UserID: UserID
            });

          case 2:
            _context5.next = 4;
            return _redisdatabase.client.del('AddNote');

          case 4:
            return _context5.abrupt("return", '');

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteNotes(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNotes = deleteNotes;

var archiveNotes = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, UserID) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserID: UserID
            }, {
              isArchived: true
            }, {
              "new": true
            });

          case 2:
            data = _context6.sent;
            _context6.next = 5;
            return _redisdatabase.client.del('AddNote');

          case 5:
            return _context6.abrupt("return", data);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function archiveNotes(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.archiveNotes = archiveNotes;

var isTrash = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id, UserID) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: _id,
              UserID: UserID
            }, {
              isDeleted: true
            }, {
              "new": true
            });

          case 2:
            data = _context7.sent;
            _context7.next = 5;
            return _redisdatabase.client.del('AddNote');

          case 5:
            return _context7.abrupt("return", data);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function isTrash(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.isTrash = isTrash;