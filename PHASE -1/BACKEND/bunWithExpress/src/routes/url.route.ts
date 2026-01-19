import { Router } from "express";
import getShortUrl from "../controllers/url.controllers";


const route = Router(); 

route.post("/", getShortUrl);


export default route;