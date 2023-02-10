import { searchUser } from "../interfaces/userInterfaces";
import Ajv, {JSONSchemaType} from "ajv";


// Intance the class
const ajv = new Ajv();



const searchUserSchema:JSONSchemaType<searchUser> = {
  type:"object",
  properties:{
    username:{
      type:"string",
      minLength:1,
      maxLength:20
    }
  },
  required:["username"],
  additionalProperties:false
};


export const searchUserValidate = ajv.compile(searchUserSchema);