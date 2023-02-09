import Ajv,{JSONSchemaType} from "ajv";
import addFormats from "ajv-formats";
import { signupData} from "../interfaces/signup";


// Instance the class
const ajv = new Ajv();
addFormats(ajv);



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
  additionalProperties:false
}



export const signupValidate = ajv.compile(signupSchema);