import 'dotenv/config';
import express from "express";
import userRouter from "./routes/user.route.js"
import {authenticationMiddleware} from "./middlewares/auth.middleware.js"
import urlRouter from "./routes/url.route.js"
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(authenticationMiddleware);


app.get("/", (req,res)=>{
    res.status(200).json({status: "Success"});
})
    
app.use("/user",userRouter);
app.use(urlRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}...`);
})