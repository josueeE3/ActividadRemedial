import express from "express";
import cookieParser from "cookie-parser";

import DoctorRuta from "./src/routes/Doctor.js"
import PacienteRuta from "./src/routes/Paciente.js"
import loginRoutes from "./src/routes/Login.js";
import logoutRoutes from "./src/routes/logout.js";
import citaRoutes from "./src/routes/Cita.js";



const app = express();

app.use(cookieParser())                                                   

app.use(express.json());
app.use("/api/doctor", DoctorRuta);
app.use("/api/paciente", PacienteRuta);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/cita", citaRoutes);


export default app; 