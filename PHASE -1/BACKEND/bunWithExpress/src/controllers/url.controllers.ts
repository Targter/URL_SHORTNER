import  type { Request ,Response} from "express";
const getShortUrl = (req:Request, res:Response)=>{
    // const params = req.params
    // console.log(params)
    const body = req.body; 
    const url = body.longUrl;
    return res.json({message:"Url is responding... preparing to send the short Url",para: url})
}

export default getShortUrl;