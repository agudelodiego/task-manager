import Ajv,{JSONSchemaType} from "ajv";
import addFormats from "ajv-formats";
import { loginData } from "../interfaces/login";

// Instance the class
const ajv = new Ajv();
addFormats(ajv);


const loginSchema:JSONSchemaType<loginData> ={
  type:"object",
  properties:{
    email:{
      type: "string",
      format:"email"
    },
    password:{
      type: "string",
      minLength:8
    }
  },
  required:["email","password"],
  additionalProperties:false
};



export const loginValidate = ajv.compile(loginSchema);
