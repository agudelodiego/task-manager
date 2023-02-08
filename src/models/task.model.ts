import mongoose from "mongoose";



export const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:[true,'You must provide the title propertie'],
    min:[2,'The title must have more than two characters'],
    max:[30,'The titel cannot have more then 30 characters']
  },
  description:{
    type:String,
    trim:true,
    required:[true,'You must provide the description propertie'],
    min:[5,'Description must have more than five characters'],
    max:[400,'Description cannot have more than 400 characters']
  },
  task_members:Array,
  owner:{
    type:String,
    trim:true,
    required:[true,'The task must have an owner']
  },
  finish_date:Date,
  chat:{
    type:String,
    trim:true,
    required:[true,'The task must have a chat']
  },
  start_date:{
    type:Date,
    default:Date.now
  },
  canceled:{
    type:Boolean,
    default:false
  },
  done:{
    type:Boolean,
    default:false
  }
});



export const TaskModel = mongoose.model('Task',taskSchema);