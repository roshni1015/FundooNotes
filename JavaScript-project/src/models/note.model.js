import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
    {
        Title: {type: String,required: true,},
        Descreption: {type: String,required: true,},
        Color: {type: String},
    },
    {
        timestamps: true
    }
    );

    export default model('Note', NoteSchema);