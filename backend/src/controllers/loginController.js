//Importamos los modelos
import doctorModel from "../models/Doctor.js";
import pacienteModel from "../models/Paciente.js";
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // generar token
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
  //Pedimos las cosas
  const { correo, contrasenia } = req.body;

  try {
    //Validamos los 3 posibles niveles
    // 1. Admin, 2. Empleado, 3. Cliente

    let userFound; //Guarda el usuario encontrado
    let userType; //Guarda el tipo de usuario encontrado

    //1. Admin
    if (
        correo === config.ADMIN.emailAdmin &&
        contrasenia === config.ADMIN.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      //2. Doctor
      console.log("Consultando doctorModel con correo:", correo);
      userFound = await doctorModel.findOne({ correo });
      userType = "doctor";
      if (!userFound) {
        //3. Paciente
        console.log("Consultando pacienteModel con correo:", correo);
        userFound = await pacienteModel.findOne({ correo });
        userType = "paciente";
      }
    }

    //Si no encontramos a ningun usuario con esas credenciales
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Validar la contraseña
    // SOLO SI NO ES ADMIN
    if (userType !== "admin") {
      const isMatch = await bcryptjs.hash(contrasenia, userFound.contrasenia);
      console.log("Contraseña recibida:", contrasenia);
      console.log("Password match:", userFound.contrasenia);
      if (!isMatch) {
        return res.json({ message: "Invalid password" });
      }
    }

    //// TOKEN
    //Para validar que inició sesión
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: userFound._id, userType },
      //2-Secreto
      config.JWT.secret,
      //3-Cuando expira
      { expiresIn: config.JWT.expiresIn },
      //4. Funcion flecha
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "Login successful" });
      }
    );
  } catch (error) {
    console.log("Correo recibido:", correo);

}
};

export default loginController;