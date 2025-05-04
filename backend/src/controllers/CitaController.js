import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import nodemailer from "nodemailer";
import crypto from "crypto";
import citaModel from "../models/Cita.js";
import doctorModel from "../models/Doctor.js";
import pacienteModel from "../models/Paciente.js";


import {config} from "../config.js";

const citaController = {};


citaController.getCita = async (req, res) => {
   
    try {
        const citas = await citaModel
        .find()
        .populate('doctorAsignado')
        .populate('pacienteAsignado');
        res.json(citas)

    } catch (error) {
        res.json({ message: "Error al recibir la cita : " + error.message });

    }
}   

citaController.registrarCita = async (req, res) => {
    const {
      fecha,
      hora,
      motivo,
      doctorAsignado,
      pacienteAsignado
    } = req.body;


    try {

        const doctorExistente = await doctorModel.findById(doctorAsignado);
        if (!doctorExistente) {
          return res.json({ message: "El doctor asignado no existe" });
        }

        const pacienteExistente = await pacienteModel.findById(pacienteAsignado);
        if (!pacienteExistente) {
          return res.json({ message: "El paciente asignado no existe" });
        }


        const nuevaCita = new citaModel({
            fecha,
            hora,
            motivo,
            doctorAsignado,
            pacienteAsignado
          });
      
          await nuevaCita.save();
          res.json({ message: "Cita registrada correctamente" });

        
    } catch (error) {
        res.json({ message: "Error al registrar la cita: " + error.message });

    }

};

export default citaController;
