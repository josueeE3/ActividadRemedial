import express from "express";
import doctorController from "../controllers/DoctorController.js";


const router = express.Router();

router.route("/").post(doctorController.registrarDoctor)


export default router;