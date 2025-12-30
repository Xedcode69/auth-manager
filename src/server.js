import app from "./app.js";

import 'dotenv/config';


const PORT = process.env.PORT;

const connection = app.listen(PORT, ()=>{
    try {
        if (connection){
            console.log(`Connection established on http://localhost:${PORT}`);
        }
    } catch (error) {
        console.log('Cannot connect to server', error);
    }
})


export default connection;