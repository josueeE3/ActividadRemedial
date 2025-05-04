import express from "express";
import citaController from "../controllers/CitaController.js";


const router = express.Router();

router.route("/")
.get(citaController.getCita)
.post(citaController.registrarCita)


export default router;