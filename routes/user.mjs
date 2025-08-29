import express from "express";
import Users from "../models/users.mjs";

const router=express.Router()

router.get('/',async(req,res)=>{
    const users=await Users.find()
    res.send({message:'Data Fetched Successfully',Data:users})
})

router.post('/register',async(req,res)=>{
    try{
    const user=new Users(req.body)
    await user.save()
    res.send({ message: "User registered successfully!" })
    }
    catch(e){
        res.send({message:e.message})
    }
})


router.post('/login',async(req,res)=>{
    //Step 1: Check if email exists
    try{
        const {email,password}=req.body

        const user=await Users.findOne({email})
    if(!user){
        res.send({message:'User Not Found'})
        return
    }
    //Step 2: Compare the passwords
    const isCorrect=user.comparePassword(password)
    if(!isCorrect){
        res.status(404).send({message:'Invalid Password'})
        return
    }
    //Step 3: Generate Token
    const token = user.generateToken()
    user.tokens.push(token)
    await user.save()

    res.send({ message: 'User logged in successfully!',token })
}
    catch(e){
        res.status(404).send({message:e.messsage})
    }
})

router.put('/logout',verifyToken,async(req,res)=>{
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({message:'Logged Out Successfully'})
})
