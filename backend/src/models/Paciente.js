/*
 Campos:
 nombre
 edad 
 correo
 contrasenia 
 telefono

*/


import {Schema, model} from "mongoose";

const productsSchema = new Schema ( 

    {

        nombre: {
            type: String,
            required: true,
            min: 3
        },
        edad: {
            type: Number,
            required: true,
            min: 18
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
        },
        telefono: {
            type: String,
            required: true
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

export default model("paciente", productsSchema);
