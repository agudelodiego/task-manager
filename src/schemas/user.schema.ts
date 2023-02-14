import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

// Instance the class
const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);




export const userSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      maxLength: 20,
      minLength: 2,
      errorMessage: "You must provide an username with at least 2 and at most 20 characters"
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: "You must provide a valid email address"
    },
    password: {
      type: "string",
      minLength: 6,
      errorMessage: "You must provide a password with at least 6 characters"
    },
    verifiedEmail: {
      type: "boolean",
    },
    friends: {
      type: "array",
      items: {
        type: "string",
        errorMessage:"Each friends item must be an string"
      },
      
    },
    tasks: {
      type: "array",
      items: {
        type: "string",
        errorMessage:"Each task item must be an string"
      },
    },
    chats: {
      type: "array",
      items: {
        type: "string",
        errorMessage:"Each chat item must be an string"
      },
    },
  },
  required:[],
  additionalProperties: false
};
export const userValidator = ajv.compile(userSchema);




const signupSchema = {
  type:"object",
  properties:{
    username: {
      type: "string",
      maxLength: 10,
      minLength: 2,
      errorMessage: "You must provide an username with at least 2 and at most 10 characters"
    },
    email:{
      type: "string",
      format: "email",
      errorMessage: "You must provide a valid email address"
    },
    password:{
      type: "string",
      minLength: 6,
      errorMessage: "You must provide a password with at least 6 characters"
    }
  },
  required:["username", "email", "password"],
  additionalProperties: false
};
export const signupValidator = ajv.compile(signupSchema);



const loginSchema = {
  type:"object",
  properties:{
    email:{
      type: "string",
      format: "email",
      errorMessage: "You must provide a valid email address"
    },
    password:{
      type: "string",
      minLength: 6,
      errorMessage: "You must provide a password with at least 6 characters"
    }
  },
  required:["email", "password"],
  additionalProperties: false
};
export const loginValidator = ajv.compile(loginSchema);



const updateUserSchema = {
  type:"object",
  properties:{
    password:{
      type:"string",
      maxLength: 10,
      minLength: 2,
      errorMessage: "You must provide an username with at least 2 and at most 10 characters"
    },
    forUpdate:{
      $ref: "#/definitions/userSchema",
      errorMessage: "You must provide the properties that you want to update"
    }
  },
  required:["password", "forUpdate"],
  additionalProperties: false,
  definitions: {
    userSchema: userSchema
  }
};
export const updateUserValidator = ajv.compile(updateUserSchema);