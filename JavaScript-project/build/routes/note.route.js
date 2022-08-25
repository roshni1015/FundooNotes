"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var noteController = _interopRequireWildcard(require("../controllers/note.controller"));

var _note2 = require("../validators/note.validator");

var _auth = require("../middlewares/auth.middleware");

var redis = _interopRequireWildcard(require("../middlewares/redis.middleware"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to Create Note


router.post('', _note2.NoteValidator, _auth.userAuth, noteController.AddNote); //route to get all notes

router.get('', _auth.userAuth, redis.redis_Notes, noteController.getAllNotes); //route to get a single note

router.get('/:_id', _auth.userAuth, noteController.getNote); //route to update notes

router.put('/:_id', _auth.userAuth, noteController.updateNotes); //route to delete a single notes

router["delete"]('/:_id', _auth.userAuth, noteController.deleteNotes); //router to archive notes

router.put('/:_id/isArchive', _auth.userAuth, noteController.archiveNotes); //router to isDelete

router.put('/:_id/isDelete', _auth.userAuth, noteController.isTrash);
var _default = router;
exports["default"] = _default;