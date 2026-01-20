import express from "express"
import route from "./routes/url.route"
import routeencoding from "./routes/url.encoded.routes"
import routemostoptimized from "./routes/url.mostoptimized.routes"
const app = express(); 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/getUrl",route);
app.use("/getUrlencoded",routeencoding);
app.use("/getUrloptimized",routemostoptimized);
app.get("/",(req,res)=>{
    res.send("Express is running with Bunner....")
})

export default app; 