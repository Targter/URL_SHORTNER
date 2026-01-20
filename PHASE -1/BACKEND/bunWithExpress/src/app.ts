import express from "express"
import route from "./routes/url.route"
const app = express(); 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/getUrl",route);


app.get("/",(req,res)=>{
    res.send("Express is running with Bunner....")
})

export default app; 