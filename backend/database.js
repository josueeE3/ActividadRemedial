import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { config } from "./src/config.js";
mongoose.connect(config.db.URI)

//const URI = "mongodb://localhost:27017/ZonaDigitalDB20230357";
//const URI = "mongodb+srv://Josue_rm:RealMadrid_elbichoGoat2018@Cluster0.mongodb.net/MOPT?retryWrites=true&w=majority";

//mongoose.connect(URI);

const connection = mongoose.connection;


connection.once("open", () => 
  {
    console.log("Connected");
} );

connection.once("disconnected", () => 
    {
      console.log("disconnected");
  } );


  connection.once("error", (error) => 
    {
      console.log("error found" + error);
  } );

