import app from "./app.js";
import "./database.js";
import dotenv from "dotenv"

dotenv.config();

import { config } from "./src/config.js";

async function main(){

    const port = 4000;
    app.listen(config.Server.port);

    console.log("Server on port" + config.Server.port); 
}
main();