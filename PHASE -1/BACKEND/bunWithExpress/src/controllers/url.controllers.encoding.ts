// in this change the implementation with the encoding or convert url function with previous.. 
// now i am going to do the encoding or hash teh data.. 
// which is not give the same url for two



import  type { Request ,Response} from "express";
import UrL from "../models/url.models";
// for converting the shortUrl with collision detection 

// const convertUrl = (len:number)=>{
//     let code = "";
//     for(let i = 0; i<len; i++){
//         code += Math.floor(Math.random()*10)
//     }
//     // console.log("Uppercode.",code)
//     return code; 
// }

// Current Issues.. 
// collision : there will be same Url because of the random variable.. 
// single point of failure.. no caching no recovery mechanism
// show db lookups : caching
// no scale.. 

// solve; 
const convertUrl = (len: bigint) => {
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let code = ""
    const charLen = BigInt(chars.length)
    // On means the bigint zero..

    while(len > 0n){
        code = chars[Number(len % charLen)] + code; 
        len =len / charLen;
    }

    // console.log("Output Encoded Code" , code)


    return code;
}

const getShortUrl = async (req:Request, res:Response)=>{
    // const params = req.params
    // console.log(params)
    const body = req.body; 
    const url = body.longUrl;

    const urlExist = await UrL.findOne({longUrl:url});

    if(urlExist){
        return res.json({message:"Url Already Exist", shortUrl: urlExist.shortUrl})
    }

    const urrl = await UrL.create({longUrl:url});

    // const id = urrl._id.toString()
    // console.log(typeof urrl._id)

    // increase the len of the string to get the shortUrl of more len.. 
    // hexdecimal. 16char of the id.. containing the hexadecimal values 
    // 16^10 of len : 1 trillion 
    // 16^6 of len : 16 million
    // const id = parseInt(urrl._id.toString().slice(-6),16)
    // console.log(id)

    // more with precision friendly
    const id = BigInt("0x" + urrl._id.toString().slice(-6));

    const shortUrl = convertUrl(id);
    // console.log("shortUrl: ",shortUrl);

    // await UrL.create({shortUrl}); 
    // UrL.update
    urrl.shortUrl = shortUrl; 

    await urrl.save(); 

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