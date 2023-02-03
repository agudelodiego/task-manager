import { Request, Response } from "express";


export const getChats = (req:Request,res:Response) => {
  const chats = [
    {
      members: ["Diego","Otro parcero"],
      messages: [
        {
          from:"Diego",
          content: "Oelo parcero, entonces que, todo bien o que ?",
          date: "20/06/2020"
        }
      ]
    },
    {
      members: ["Diego","Otro parcero"],
      messages: [
        {
          from:"Diego",
          content: "Oelo parcero, entonces que, todo bien o que ?",
          date: "20/06/2020"
        }
      ]
    }
  ];
  res.json(chats);
};


export const createChat = (req:Request,res:Response) => {
  res.status(201).json({result:"Chat created succesful"});
};


export const getChat = (req:Request,res:Response) => {
  const chat = {
    members: ["Diego","Otro parcero"],
    messages: [
      {
        from:"Diego",
        content: "Oelo parcero, entonces que, todo bien o que ?",
        date: "20/06/2020"
      }
    ]
  };
  res.json(chat);
};


export const updateChat = (req:Request,res:Response) => {
  res.json({result:"Chat updated successful"});
};