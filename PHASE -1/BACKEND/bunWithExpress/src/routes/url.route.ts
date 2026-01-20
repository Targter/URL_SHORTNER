import { Router } from "express";
import { getAnalytics, getShortUrl,RedirectPage } from "../controllers/url.controllers";


const route = Router(); 

route.post("/", getShortUrl);
route.get("/:url", RedirectPage)
route.get("/analytics/:shortUrl",getAnalytics)

export default route;
