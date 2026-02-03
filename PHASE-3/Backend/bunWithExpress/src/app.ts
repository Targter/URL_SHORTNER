import express from "express"
// import route from "./routes/url.route"
// import routeencoding from "./routes/url.encoded.routes"
import routemostoptimized from "./routes/url.mostoptimized.routes"
import client from "./Redisclient";
const app = express(); 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use("/getUrl",route);
// app.use("/getUrlencoded",routeencoding);
app.use("/getUrloptimized",routemostoptimized);
app.get("/", (req, res) => {
  res.send({
    message: "Hello from the cluster!",
    // os.hostname() in Docker returns the unique Container ID
    server_id: require('os').hostname(), 
    // This tells you which internal port handled it
    internal_port: 3000 
  });
});

app.get('/test', async (req, res) => {
  await client.set('last_visit', new Date().toISOString());
  const value = await client.get('last_visit');
  res.send(`Last visit was: ${value}`);
});

export default app; 