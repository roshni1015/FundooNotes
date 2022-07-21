import Note from '../models/note.model';

export const AddNote = async (body) => {
    console.log(body);
    const data = await Note.create(body);
    console.log(data);
    return data;
}

export const getAllNotes = async (req) => {
    const data = await Note.find({UserID:req.UserID});
    return data;
}

export const getNote = async (_id, body) => {
    const data = await Note.findById({_id,UserID:body.UserID});
    return data;
}

export const updateNotes = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
        {
            _id:_id ,UserID:body.UserID
          },
          body,
          {
            new: true
          }
    );
    return data;
  };

  export const deleteNotes = async (_id,UserID) => {
    await Note.findByIdAndDelete({_id,UserID:UserID});
    return '';
  };
