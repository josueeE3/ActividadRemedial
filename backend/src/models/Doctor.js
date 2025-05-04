/*
 Campos:
 nombre
 especialidad 
 correo
 contrasenia 
 

*/


import {Schema, model} from "mongoose";

const productsSchema = new Schema ( 

    {

        nombre: {
            type: String,
            required: true,
            min: 3
        },
        especialidad: {
            type: String,
            required: true,
            min: 10
        },
        correo: {
            type: String,
            required: true,
            unique: true 
        },
        contrasenia: {
            type: String,
            required: true,
            minlength: 5 
        } ,
        isVerified: {
            type: Boolean,
            default: false
          }
        ,} , 
    
        {
            timestamps: true,
            strict: false 
         }

);

export default model("doctor", productsSchema);