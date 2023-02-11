import { searchUser, updateUser } from "../interfaces/userInterfaces";
import Ajv, {JSONSchemaType} from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";


// Intance the class
const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);


//* ------------------------------------------------------------------------------------------------------------------------------------------------------------
// This schema validate if the client provide a correct structure for searcha a user inside the database 
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
  additionalProperties:false,
  errorMessage:{
    type:"You must provide an object with propertie username",
    required:"You must provide the username inside the query string"
  }
};
export const searchUserValidate = ajv.compile(searchUserSchema);
//* ------------------------------------------------------------------------------------------------------------------------------------------------------------




//* ------------------------------------------------------------------------------------------------------------------------------------------------------------
// This schema validate if the client provides a correct structure for update a user
const updateUserSchema:JSONSchemaType<updateUser> = {
  type:"object",
  properties:{
    password:{
      type:"string",
      minLength:8,
    },
    forUpdate:{
      type:"object",
      properties:{
        username:{
          type:"string",
          minLength: 4,
          maxLength: 20
        },
        email:{
          type:"string",
          format:"email"
        },
        password:{
          type:"string",
          minLength:8
        },
        friends:{
          type:"array",
          items:{type:"string"}
        },
        chats:{
          type:"array",
          items:{type:"string"}
        },
        tasks:{
          type:"array",
          items:{type:"string"}
        }
      },
      required:[],
      additionalProperties:false
    }
  },
  required:["password","forUpdate"],
  additionalProperties:false,
  errorMessage:{
    type:"You must provide and objet that can conatain several properties",
    required:{
      password:"You must provide your password for update your profile",
      forUpdate:"You must to provide some properties forUpdate propertie, that contain the items that you want to update in your profile"
    }
  }
  
};
export const updateUserValidate = ajv.compile(updateUserSchema);
//* ------------------------------------------------------------------------------------------------------------------------------------------------------------