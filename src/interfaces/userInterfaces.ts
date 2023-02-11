export interface searchUser {
  username:string
};

export interface updateUser {
  password:string
  forUpdate:{
    username:string,
    email:string,
    password:string,
    friends:string[],
    chats:string[],
    tasks:string[]
  }
  
};


export interface User extends Document{
  username:string,
  email:string,
  password:string,
  confirmation:boolean,
  friends:string[],
  chats:string[],
  tasks:string[] 
}