import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    min:[2,'User name must have more than 2 characters'],
    max:[40,'User name cannot have more than 40 characters'],
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    min:[11,'Email must have more than 11 characters'],
    max:[50,'Email cannot have more than 50 characters'],

  },
  password:{
    type:String,
    required:true,
    trim:true,
    min:[5,'Password name must have more than 5 characters'],
    max:[40,'Password cannot have more than 40 characters'],
  },
  confirmation:{
    type:Boolean,
    default:false
  },
  friends:Array,
  chats:Array,
  task:Array
});


export const UserModel = mongoose.model('User',userSchema);