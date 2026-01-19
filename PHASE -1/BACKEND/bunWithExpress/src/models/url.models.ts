import mongoose from "mongoose";

const urlShortner = new mongoose.Schema({
    longUrl : {
        type:String,
        required:true
    }
    , 
    shortUrl:{
        type:String,
        required:true
    },
    clicks:{
        type:[],
        default:[]
    }
},{timestamps:true})

const UrL =  mongoose.model("UrL",urlShortner) 

export default UrL;