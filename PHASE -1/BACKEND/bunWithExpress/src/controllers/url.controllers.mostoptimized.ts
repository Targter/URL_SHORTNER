// in this change the implementation with the encoding or convert url function with previous.. 
// now i am going to do the encoding or hash teh data.. 
// which is not give the same url for two



import  type { Request ,Response} from "express";
import UrLL from "../models/url.models.mostoptimized";

// most optimized with index
// required the id 
// no collision detection 
// work with random url.
// not expected outcome 

const convertUrl = (len:number) => {
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let code = ""

    
    for(let i = 0; i<len; i++){
        code += chars[Math.floor(Math.random()*chars.length)]
    }

    console.log("Output Encoded Code" , code)


    return code;
}

const getShortUrl = async (req:Request, res:Response)=>{
    // const params = req.params
    // console.log(params)
    const body = req.body; 
    const url = body.longUrl;

    const urlExist = await UrLL.findOne({longUrl:url});

    if(urlExist){
        return res.json({message:"Url Already Exist", shortUrl: urlExist.shortUrl})
    }

    // for short Url 
    let exists = true; 
    let shortCode; 

    while(exists){
        shortCode = convertUrl(6)
        let found = await UrLL.exists({shortUrl:shortCode})
        exists = !!found
    }


    const urrl = await UrLL.create({longUrl:url,shortUrl: shortCode})

    return res.json({message:"Url is responding... preparing to send the short Url",shortUrl: urrl.shortUrl})
}

// redirectUrl: 
const RedirectPage = async(req:Request, res:Response) => {

    console.log("shortUrl")
    const shortUrl = req.params.url;

    const Url = await UrLL.findOne({shortUrl});
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

    const url = await UrLL.findOne({shortUrl});

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