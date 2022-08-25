import { client } from '../config/redisdatabase';
import Note from '../models/note.model';

export const AddNote = async (body) => {
    //console.log(body);
    const data = await Note.create(body);
   // console.log(data);
   if(data){
    await client.del('AddNote');
   }
    return data;
}

export const getAllNotes = async (req) => {
    const data = await Note.find({UserID:req.UserID});
    if(data){
      client.set('AddNote', JSON.stringify(data))
    }
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
    if(data) {
      await client.del('AddNote');

    }
    return data;
  };

  export const deleteNotes = async (_id,UserID) => {
    await Note.findByIdAndDelete({_id,UserID:UserID});
    await client.del('AddNote');
    return '';
  };
  
  export const archiveNotes = async(_id,UserID) =>{
    const data = await Note.findByIdAndUpdate(
      {
       _id:_id,UserID:UserID
      },
      {
        isArchived: true
      },
      {
        new: true
      }
    );
    if(data){
      await client.del('AddNote');

    }
    return data;
  }
  
  export const isTrash = async(_id,UserID) =>{
    const data = await Note.findByIdAndUpdate(
      {
        _id:_id,UserID:UserID
      },
      {
        isDeleted: true
      },
      {
        new: true
      }
    );
    if(data){
      await client.del('AddNote');

    }

    return data;
  }

  