import {prop,getModelForClass, Ref} from "@typegoose/typegoose";
import { User } from "./user.model";


export class Task {
  @prop({ 
    required: true,
    minlength: 5,
    maxlength: 40
  })
  title: string

  @prop({ 
    required: true,
    minlength: 4 
  })
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
};
export const TaskModel = getModelForClass(Task);