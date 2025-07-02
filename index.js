import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({})
import connectDB from "./utils/db.js"
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origine : "http//localhost:5273",
    Credentials: true
}));


let PORT = process.env.PORT || 3001;

app.use('/api/user' , userRoute);
app.use('/api/company' , companyRoute);
app.use('/api/job' , jobRouter);
app.use('/api/application' , applicationRouter);

app.listen(PORT , ()=>{
    connectDB()
    console.log(`server running at http//localhost:${PORT}`)

})

