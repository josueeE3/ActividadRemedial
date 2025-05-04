import express from "express";
import pacienteController from "../controllers/PacienteController.js";


const router = express.Router();

router.route("/").post(pacienteController.registrarPaciente)
router.route("/verifyCodeEmail").post(pacienteController.verifyCodeEmail)


export default router;