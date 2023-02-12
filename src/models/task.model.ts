import {prop,getModelForClass, Ref} from "@typegoose/typegoose";
import { Chat } from "./chat.model";
import { User } from "./user.model";


export class Task {
  @prop({ 
    required: true,
    minlength: 5,
    maxlength: 20
  })
  title: string

  @prop({ required: true })
  description: string

  @prop({ 
    ref: "User"
  })
  members: Ref<User>[]

  @prop({ 
    ref: "User",
    required: true
  })
  owner: Ref<User>

  @prop({
    required:true,
    default: Date.now()
  })
  start: Date

  @prop()
  finish: Date

  @prop({ 
    required:true,
    default: false
  })
  canceled: boolean

  @prop({
    required:true,
    default:false
  })
  done: boolean

  @prop({ ref: "Chat" })
  chat: Ref<Chat>
};
export const TaskModel = getModelForClass(Task);