import Ajv,{JSONSchemaType} from "ajv";
import addFormats from "ajv-formats";
import { signupData} from "../interfaces/signup";
import ajvErrors from "ajv-errors";


// Instance the class
const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);



const signupSchema:JSONSchemaType<signupData> = {
  type:"object",
  properties:{
    email:{
      type: "string",
      format:"email"
    },
    password:{
      type: "string",
      minLength:8
    },
    username:{
      type:"string",
      minLength: 4,
      maxLength: 20
    } 
  },
  required:["email","password","username"],
  additionalProperties:false,
  errorMessage: {
    type: "Body must be an object with properties email, password and username",
    required: {
      email:"You must provide an email with a correct structure",
      password:"You must provide a password with at least 8 characteres",
      username:"You must provide a the username"
    },
    additionalProperties: "The body only can contain 3 properites, email, username and password",
  }
}



export const signupValidate = ajv.compile(signupSchema);