import dotenv from "dotenv";

dotenv.config();



export const config = {
    db:{
        URI: 
        process.env.DB_URI || "mongodb://localhost:27017/ZonaDigitalDB20230357"
    },
    Server:{
        port: process.env.PORT || 4000,
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
    },
    ADMIN:{
        emailAdmin: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    USER:{
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
}

