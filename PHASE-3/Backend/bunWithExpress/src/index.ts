import app from "./app";
import dbConfig from "./db/dbConfig";
import "dotenv/config"



const runServer = async ()=>{

    await dbConfig();
    app.listen(process.env.PORT, ()=>{
        console.log("Process is running on localhost:",process.env.PORT)
    })
}





runServer();