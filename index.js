import express from "express";
import dotenv, { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import dbConnection from "./db/db.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"


const app = express();

dotenv.config();
dbConnection()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute)

app.get("/", (req, res)=>{
    res.send("this is home page")
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})