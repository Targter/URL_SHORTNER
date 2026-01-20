import mongoose from "mongoose";

const urlShortnerr = new mongoose.Schema({
    longUrl : {
        type:String,
        required:true
    }
    , 
    shortUrl:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    clicks:{
        type:[],
        default:[]
    }
},{timestamps:true})

const UrLL =  mongoose.model("UrLL",urlShortnerr) 

export default UrLL;