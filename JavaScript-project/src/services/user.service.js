import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';


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
  //console.log("Userdata inside Service ------>", userdata);
  const data = await User.findOne({EmailID: userdata.EmailID});
  console.log("Data After Search", data);
  if(data != null){
    const match = await bcrypt.compare(userdata.Password, data.Password);
    if(match){
      const token = jwt.sign({ "Id": data._id, "FirstName": data.FirstName, "Email": data.EmailID }, process.env.SECRET_KEY);      
      return token;
    }else{
      throw new Error("Invalid Password");
    }
  }
  else{
    throw new Error("User Doesn't Exists")
  }
};
 




