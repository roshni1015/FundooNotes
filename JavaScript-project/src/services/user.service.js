import User from '../models/user.model';
import bcrypt from 'bcrypt';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const UserRegistration = async (body) => {
  //console.log("User Registration Request", body);
  //console.log("User Registration Request Password", body.Password);
  const saltRounds = 10;
  let hashPassword = await bcrypt.hash(body.Password, saltRounds) 
  //console.log("Hash Password", hashPassword);
  body.Password = hashPassword;
  //console.log("After Hashing req body", body);
  const data = await User.create(body);
  return data;
};

//get single user
export const UserLogin = async (userdata) => {
  const data = await User.findOne({EmailID: userdata.EmailID});
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};


