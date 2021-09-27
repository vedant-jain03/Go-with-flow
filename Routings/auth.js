const express = require('express')
const router = express.Router();
const app = express();
const User = require('../models and schemas/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ProjectModel = require('../models and schemas/Project');


router.post('/register', async(req,res)=>{
    try{
        let { name,email,password,cpassword } = req.body;
        if(!name || !email || !password || !cpassword){
            return res.status(400).json({message:"Empty Fields"});
        }
        const userexist = await User.findOne({email: email});
        if(userexist){
            return res.status(400).json({message:"User Exist!"})
        }
        if(password!==cpassword){
            return res.status(400).json({message:"Password not match"});
        }
        
        const newuser = await new User({name,email,password,cpassword});

        const user_registered = await newuser.save();
        if(!user_registered){
            return res.status(404).json({message: "Something Went Wrong"});
        }
        return res.status(201).json({message:"User Register Successfully!"});
    }catch(err){
        console.log(err);
    }
})
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user_email = await User.findOne({email:email});
        if(!user_email){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const is_pswd = await bcrypt.compare(password,user_email.password);
        if(!is_pswd){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        return res.status(200).json({message:"User Login Successfully!", user: user_email})
    }catch(err){
        console.log(err);
    }
})

router.post('/createNewProject',async(req,res)=>{
    try{
        const { email,projectname,elements } = req.body;
        if(projectname==='')projectname="Untitled";
        const newProject = new ProjectModel({ email,projectname,elements: "[]" });
        const output = await newProject.save();
        return res.status(200).json({output, message: "New Project Created"});
    }catch(err){
        console.log(err);
    }
})

router.get('/getMyFlowcharts/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const projects = await ProjectModel.find({email: id});
        return res.status(200).json({projects});
    }catch(err){
        console.log(err);
    }
})

router.get('/flowchart/:id' ,async(req,res)=>{
    try{
        const id = req.params.id
        const projectData = await ProjectModel.find({_id:id});
        return res.status(200).json({projectData: projectData});
    }catch(err){
        console.log(err);
    }
})

router.delete('/flowchart/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await ProjectModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Project Deleted"});
    }catch(err){
        console.log(err);
    }
})

router.patch('/saveMyProject/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await ProjectModel.findByIdAndUpdate(id,req.body, { new:true });
        return res.status(200).json({message:'Project Updated',result: result});
    }catch(err){
        console.log(err);
    }
})

module.exports = router