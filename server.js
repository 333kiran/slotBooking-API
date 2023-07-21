import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './Routes/slot-routes.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/slots",router);


const PORT  = process.env.PORT || 8090;

//start the server by listening the port
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})