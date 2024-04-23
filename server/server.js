import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import staffs from './Routes/staffs.js'
import Users from './Routes/users.js'
import Foods from './Routes/foodlist.js';
import Orders from './Routes/orders.js';

dotenv.config();

const app = express();
// const staffRoutes = require('./Routes/staffs')

//middleware
app.use(express.json())

app.use(cors())

// app.use((req,res,next) => {
//     console.log(req.path, req.method)
//     next()
// });

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

//Make your API calls for every usecase here
app.use('/api/staffs',staffs)
app.use('/api/users',Users)
app.use('/api/foodlist',Foods)
app.use('/api/orders',Orders)