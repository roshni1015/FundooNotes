"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var NoteSchema = new _mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Descreption: {
    type: String,
    required: true
  },
  Color: {
    type: String
  },
  isArchived: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean
  },
  UserID: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', NoteSchema);

exports["default"] = _default;