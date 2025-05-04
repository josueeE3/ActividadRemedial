/*
 Campos:
 fecha
 hora 
 motivo
 doctorAsignado
 pacienteAsignado 
 

*/


import {Schema, model} from "mongoose";

const productsSchema = new Schema ( 

    {

        fecha: {
            type: String,
            required: true,
        },
        hora: {
            type: String,
            required: true,
        },
        motivo: {
            type: String,
            required: true,
        },
        doctorAsignado: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "doctor",
        },
        pacienteAsignado: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "paciente",
        } 
        ,} , 
    
        {
            timestamps: true,
            strict: false 
         }

);

export default model("cita", productsSchema);