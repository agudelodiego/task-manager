// Typegoose functionality
import { 
  prop,
  getModelForClass, 
  Ref, 
  pre, 
  ReturnModelType 
} from "@typegoose/typegoose"

// Models
import { Chat } from "./chat.model"
import { Task } from "./task.model"

// Library for encryp the passwords
import argon2 from "argon2";



@pre<User>("save",async function(){

  // Before the user is created his password will encrypt using argon2 library
  this.password = await argon2.hash(this.password);
})
export class User {
  @prop({ 
    required:true,
    minlength:2,
    maxlength:10,
    unique:true
  })
  username: string

  @prop({ 
    required:true,
    trim: true,
    unique:true
  })
  email: string

  @prop({ 
    required:true,
    minlength: 6
  })
  password: string

  @prop({
    required:true,
    default:false
  })
  verifiedEmail: boolean

  @prop({ ref: "User" })
  friends: Ref<User>[]

  @prop({ ref: "Task" })
  tasks: Ref<Task>[]

  @prop({ ref: "Chat" })
  chats: Ref<Chat>[]

  static async verifyPassword(this: ReturnModelType<typeof User>, email:string, password:string){

    // Find the user
    let user = await this.findOne({email});

    // If user exist will verify the password
    if(user){
      return argon2.verify(user.password,password);
    }

    return false;
  }

};
export const UserModel = getModelForClass(User);