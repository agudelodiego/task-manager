import mongoose from "mongoose";


export const chatSchema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    min:[2,'Name must have more than 2 characters'],
    max:[30,'Name cannot have more then 30 characters']
  },
  chat_members:{
    type:Array,
    required:[true,'The chat must have any memeber']
  },
  messges:[
    {
      sendBy:String,
      content:String,
      date:Date
    }
  ]
});


export const ChatModel = mongoose.model('Chat',chatSchema)