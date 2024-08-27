import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import model from "./models/user.js";
import jwt from "jsonwebtoken"

const app = express();

app.use(cors());
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/authendam")


//Register Server
app.use("/api/register",async (req,res)=>{
    const data = req.body
    try {
     const user = await model.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
     })
     res.json({status:"ok"});
     console.log(data)
    } catch (error) {
        console.log(error)
        return res.json({msg:"Error occured"})
    }
})


//Login Server
app.use("/api/login",async (req,res)=>{
    const data = req.body
    try {
     const user = await model.findOne({
        email:req.body.email,
        password:req.body.password
     })

     if(user){
        const token = jwt.sign(
            {
                name:user.name,
                email:user.email
            },
            'secret123'
        )
        return res.json({status:"ok",userData:token});
     }else{
        return res.json({msg:"Error occured"})
     }
    //  console.log(data)
    } catch (error) {
        console.log(error)
        return res.json({msg:"Error occured"})
    }

})


app.get("/",(req,res)=>{
    res.json ({
        msg:"Welcome to my MERN Page"
    })
})

app.listen(5643,()=>console.log("Server is laive on 5643"))