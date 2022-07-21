import express from 'express';
import * as noteController from '../controllers/note.controller';
import { NoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to Create Note
router.post('',NoteValidator, userAuth, noteController.AddNote);

//route to get all notes
router.get('', userAuth, noteController.getAllNotes);

//route to get a single note
router.get('/:_id', userAuth, noteController.getNote);

//route to update notes
router.put('/:_id', userAuth, noteController.updateNotes);

//route to delete a single notes
router.delete('/:_id', userAuth, noteController.deleteNotes);

export default router;
