import  type { Request ,Response} from "express";
import UrL from "../models/url.models";
// for converting the shortUrl with collision detection 

const convertUrl = (len:number)=>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let code = "";
    for(let i = 0; i<len; i++){
        code += Math.floor(Math.random()*10)
    }
    // console.log("Uppercode.",code)
    return code; 
}

// Current Issues.. 
// collision : there will be same Url because of the random variable.. 
// single point of failure.. no caching no recovery mechanism
// show db lookups : caching
// no scale.. 

const getShortUrl = async (req:Request, res:Response)=>{
    // const params = req.params
    // console.log(params)
    const body = req.body; 
    const url = body.longUrl;

    const urlExist = await UrL.findOne({longUrl:url});

    if(urlExist){
        return res.json({message:"Url Already Exist", shortUrl: urlExist.shortUrl})
    }

    const shortUrl = convertUrl(6);
    // console.log("shortUrl: ",shortUrl);

    await UrL.create({longUrl: url,shortUrl}); 

    return res.json({message:"Url is responding... preparing to send the short Url",shortUrl: shortUrl})
}

// redirectUrl: 
const RedirectPage = async(req:Request, res:Response) => {

    console.log("shortUrl")
    const shortUrl = req.params.url;

    const Url = await UrL.findOne({shortUrl});
    // 
    if(!Url){
        res.status(400).json({message:"Bad Request | no Url found"});
        return;
    }
    Url.clicks.push({timeStampCall:Date.now()})
    await Url.save();
    console.log("foundUrlinDB:",Url.longUrl)
    res.status(200).redirect(Url.longUrl)
    return;

    // return res.redirect()
}


const getAnalytics = async(req: Request, res:Response) => {
    const shortUrl = req.params.shortUrl; 

    const url = await UrL.findOne({shortUrl});

    if(!url){
        res.status(400).json({message:"Url not exists"})
        return;
    }

    res.status(200).json({message:"Url exists.",sucess: true, data:{
        shortUrl : url.shortUrl,
        longUrl : url.longUrl,
        clicks : url.clicks.length,
    }})

    return; 
}

export { getShortUrl, RedirectPage, getAnalytics};