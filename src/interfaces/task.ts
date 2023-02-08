export interface task {
  title:string,
  description:string,
  task_members:string[],
  owner:string,
  finish_date:Date,
  chat:string,
  start_date:Date
  canceled: boolean
  done:boolean
}