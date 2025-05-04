import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import nodemailer from "nodemailer";
import crypto from "crypto";
import doctorModel from "../models/Doctor.js";

import {config} from "../config.js";

const doctorController = {};

doctorController.registrarDoctor = async (req, res) => {

    const {

        nombre,
        especialidad ,
        correo,
        contrasenia ,
        isVerified
    } = req.body;


    try {
        const existingDoctor = await doctorModel.findOne({correo})

        if(existingDoctor){
            return res.json({message: "Este doctor ya existe"})
        }

        const passwordHash = await bcryptjs.hash(contrasenia, 10)

        const newDoctor = new doctorModel(
            {
                nombre,
                especialidad ,
                correo,
                contrasenia : passwordHash ,
                isVerified: isVerified || false
            }
        )

        await newDoctor.save()

        res.json({message: "Doctor guardado correctamente"})

    } catch (error) {
        res.json({message: "error"+ error })
    }

}

export default doctorController;

