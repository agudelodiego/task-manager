import { prop,getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";


export class Message {
  @prop({ 
    ref: "User",
    required: true
  })
  sendBy: Ref<User>

  @prop({ 
    required:true,
    minlength: 1
  })
  content: string

  @prop({ default: Date.now() })
  date: Date
}


export class Chat {
  @prop({ required:true })
  name: string

  @prop({ 
    ref: "User",
    required: true
  })
  members: Ref<User>[]

  @prop({ type: ()=> [Message] })
  messages: Message[]
};


export const ChatModel = getModelForClass(Chat);