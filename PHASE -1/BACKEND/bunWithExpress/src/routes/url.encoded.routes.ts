import { Router } from "express";
import { getAnalytics, getShortUrl,RedirectPage } from "../controllers/url.controllers.encoding";


const route = Router(); 

// Problems
// single point of failure 
// db breakdown : if the user will increase 
// downtime
// slow : every requst need and updating to the db 
// scale : no chaching mechanism
// reliability : no unique index
// collision : url may be same 
// 

// SOLUTIONS: 
// USE THE encoding for the collision detection : 
//  but with this there is also the issue that 


// IMPROVEMENT: 
// HANDLED COLLISION DETECTION 
// 

// PROBLEM NEW; 
// IT WILL GIVE THE EXPECTED OUTPUT .. 
// THE SHORTURL MAY BE EXPECTED OR DEFINED
// ELSE ALL PROBLEM ARE SAME.
// BUT IT WILL NOT GIVE THE SAME URLL 
// IT HANDLED THE COLLISION DETECTION CAREFULLY 



route.post("/", getShortUrl);
route.get("/analytics/:shortUrl",getAnalytics)
route.get("/:url", RedirectPage)

export default route;
