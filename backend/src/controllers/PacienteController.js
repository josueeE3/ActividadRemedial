import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import nodemailer from "nodemailer";
import crypto from "crypto";
import pacienteModel from "../models/Paciente.js";

import {config} from "../config.js";

const pacienteController = {};

pacienteController.registrarPaciente = async (req, res) => {

    const {

        nombre,
        edad ,
        correo,
        contrasenia, 
        telefono,
        isVerified
    } = req.body;


    try {
        const existingPaciente = await pacienteModel.findOne({correo})

        if(existingPaciente){
            return res.json({message: "Este paciente ya existe"})
        }

        const passwordHash = await bcryptjs.hash(contrasenia, 10)

        const newPaciente = new pacienteModel(
            {
                nombre,
                edad ,
                correo,
                contrasenia: passwordHash ,
                telefono,
                isVerified: isVerified || false
            }
        )

        await newPaciente.save()



        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000 ;

        const token = jsonwebtoken.sign(
            { correo, verificationCode, expiresAt },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn }
          );
          
          // Mostrar el token en consola
          console.log("Token generado para verificación:", token);
          
          // Guardar token como cookie
          res.cookie("verificationToken", token, { maxAge: 2 * 60 * 60 * 1000});
          

    const transporter = nodemailer.createTransport(
        {
            service: "gmail",
            auth:{
                user: config.USER.user,
                pass: config.USER.pass
            }
        }
    );

    const mailOptions = {
        from: config.USER.user,
        to: correo,
        subject: "Correo de verificacion",
        text: `Para verificar que eres dueño de la cuenta, utilia este codigo ${verificationCode}\n  Este codigo expira en dos horas\n`
    }

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Paciente registrado. Revise su correo para verificar el código." });

} catch (error) {
    console.error("Error en registrarPaciente:", error);
    return res.status(500).json({ message: "Error: " + error });
};

};



pacienteController.verifyCodeEmail = async (req, res) => {
    const {verificationCode} = req.body;

    console.log("este es el verificationCode:", verificationCode);


    const token = req.cookies.verificationToken;

    console.log("Ni idea, el token:", token);


    if(!token){
        return res.json({message: "Primero registre su cuenta"})
    }

    try {

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {correo,verificationCode: storedCode} = decoded

        if (verificationCode !== storedCode) {
            return res.json({message: "Verificacion de codigo invalida"})
        }

        const paciente = await pacienteModel.findOne({correo})

        if (!paciente) {
            return res.json({message: "Paciente no encontrado"})
        }

        paciente.isVerified = true,
        await paciente.save();

        res.clearCookie("verificationToken")
         
        res.json({message: "Correo verificado exitosamente"})
    } catch (error) {
        res.json({message: "error"+error})
    }
    console.log(req.body)

}


export default pacienteController;

