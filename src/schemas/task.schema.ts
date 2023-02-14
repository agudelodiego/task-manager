import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

// Instance the class
const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);




export const taskSchema = {
  type: "object",
  properties:{
    title:{
      type:"string",
      maxLength: 40,
      minLength: 5,
      errorMessage: "You must provide a title with at least 5 and at most 40 characters" 
    },
    description:{
      type:"string",
      minLength: 5,
      errorMessage: "You must provide task description with at least 5 characters"
    },
    members:{
      type:"array",
      items:{
        type:"string",
        errorMessage: "You must to provide task memebers like an array of strings(_ids)"
      },
    },
    owner:{
      type:"string",
      errorMessage:"You must provide the task owner"
    },
    start:{
      type:"string",
      format:"date",
      errorMessage:"You must provide a valid date format for start date"
    },
    finish:{
      type:"string",
      format:"date",
      errorMessage:"You must provide a valid date format for finish date"
    },
    cancled:{
      type:"boolean"
    },
    done:{
      type:"boolean"
    }
  },
  required:[],
  additionalProperties: false
};
export const taskValidator = ajv.compile(taskSchema);



export const createTaskSchem = {
  ...taskSchema,
  required:["title","description","owner","members"]
};
export const createTaskValidator = ajv.compile(createTaskSchem);

