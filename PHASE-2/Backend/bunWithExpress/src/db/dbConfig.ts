import mongoose from "mongoose";

const dbConfig = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI as string)
    }
    catch(error){
        console.error("Db connection failed.. ",error)
        process.exit(1)

    }


}

export default dbConfig