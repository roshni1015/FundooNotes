import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { MailSender } from '../utils/nodemailer';
import { PasswordHash } from '../utils/user.util';
import { producer } from '../utils/rabbitmq';
import { client } from '../config/redisdatabase';


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const UserRegistration = async (body) => {
  //console.log("User Registration Request", body);
  //console.log("User Registration Request Password", body.Password);
  const email = await User.findOne({EmailID:body.EmailID})
  if(email){
    throw new Error("Email Id already exits");
  }else{
  const saltRounds = 10;
  let hashPassword = await bcrypt.hash(body.Password, saltRounds) 
  //console.log("Hash Password", hashPassword);
  body.Password = hashPassword;
  //console.log("After Hashing req body", body);
  const data = await User.create(body);
  producer(data);
  return data;
  }
};

//get single user
export const UserLogin = async (userdata) => {
  //console.log("Userdata inside Service ------>", userdata);
  const data = await User.findOne({EmailID: userdata.EmailID});
  console.log("Data After Search", data);
  

  if(data != null){
    const match = await bcrypt.compare(userdata.Password, data.Password);
    if(match){
      const token = jwt.sign({ "Id": data._id, "FirstName": data.FirstName, "Email": data.EmailID }, process.env.SECRET_KEY);   
      await client.del('AddNote');   
      return token;
    }else{
      throw new Error("Invalid Password");
    }
  }
  else{
    throw new Error("User Doesn't Exists")
  }


};

export const forgotPassword = async (body) => {
  const data = await User.findOne({"EmailID": body.EmailID});
  if(data != null){
    const token = jwt.sign({EmailID: data.EmailID, _id: data._id}, process.env.FORGOT_KEY);
    console.log("Inside Service Token----->>", token);
    const result = await MailSender(data.EmailID, token);
    return result;
  } else {
    throw new Error("Email not Exists");

  }
}
 
export const resetPassword = async (body) => {
  //const saltRounds = 10;
  //const Hash = await bcrypt.hash(body.Password, saltRounds);
  console.log("Inside Service",body.Password);
  const Hash = await PasswordHash(body.Password);
  body.Password = Hash;
  const data = User.findOneAndUpdate(
    {
      EmailID: body.EmailID
    },
    {
      Password: body.Password
    },
    {
      new: true
    })
    return data;
};



