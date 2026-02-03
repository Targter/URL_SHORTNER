import mongoose from "mongoose";

const dbConfig = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI as string)
        // mongoose.connect("mongodb://localhost:27017/bun_express_redis_horizontal_urlShortner3")
    }
    catch(error){
        console.error("Db connection failed.. ",error)
        process.exit(1)

    }


}

export default dbConfig