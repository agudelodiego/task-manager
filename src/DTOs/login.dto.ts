import Ajv,{JSONSchemaType} from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import { loginData } from "../interfaces/login";

// Instance the class
const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);

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
  additionalProperties:false,
  errorMessage: {
    type: "Body must be an object with properties email and password",
    required: {
      email:"You must provide an email with a correct structure",
      password:"You must provide a password with at least 8 characteres"
    },
    additionalProperties: "The body only can contain two properites, email and password",
  }
};



export const loginValidate = ajv.compile(loginSchema);
