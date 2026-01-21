import { Router } from "express";
import { getAnalytics, getShortUrl,RedirectPage } from "../controllers/url.controllers.mostoptimized";


const route = Router(); 

// solved
// handled collision : with base 62 with random var
// uniquely store the urls 
// store with index and accessed fastly with shorturl 
// not expected url 
// always getting the randowm and new url 
// get as much as the url 


// next phase -2 
// implement caching...


route.post("/", getShortUrl);
route.get("/analytics/:shortUrl",getAnalytics)
route.get("/:url", RedirectPage)

export default route;
