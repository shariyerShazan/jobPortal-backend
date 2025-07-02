import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res)=>{
    try {
        const {email, fullName , password , phoneNumber , role } = req.body;
        if(!email || !fullName || !password || !phoneNumber || !role ){
            return res.status(400).json({
                message : 'something is missing',
                success : false
            }); 
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: 'user already exist with this email.',
                success: false
            });
        };
        const hashedPassword = await bcrypt.hash(password , 10);
        await User.create({
            email,
            fullName,
            password: hashedPassword,
            phoneNumber,
            role,
        })
        return res.status(201).json({
            message: 'account created successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res)=>{
    try {
        const {email, password , role} = req.body;
        if(!email || !password || !role ){
            return res.status(400).json({
                message : 'something is missing',
                success : false ,
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'incorrect email or password',
                success: false ,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'incorrect email or password',
                success: false
            });
        };
        if(role ==! user.role){
            return  res.status(400).json({
                message: "accound doesn't exist with current role",
                success: false
            });
        };
        const tokenData ={
            userId : user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expriresIn: '1d' });

        user= {
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).cookie('token' , token ,{maxAge:1*24*60*60*1000 ,httpsOnly:true ,sameSite:'strict'}).json({
            message : `welcome back ${user.fullName}`,
            user,
            success: true,
        })

    } catch (error) {
        console.log(error)
    };
};

export const logout = async (req, res)=>{
    try {
        res.status(200).cookie('token', '' , {maxAge:'0'}).json({
            message: 'logged out successfully',
            success: true,
        })
    } catch (error) {
        console.log(error)
    };
};


export const updateProfile = async (req , res) =>{
    try {
        const {fullName, email , phoneNumber, bio , skills} = req.body;
        const file = req.file ;

        // cloudinary
         
        let skillArray;
        if(skills){
            skillArray = skills.split(',');
        }
        const userId = req._id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message : 'user not found',
                success : false ,
            });
        };

        // updatting data
        if(fullName){
            user.fullName = fullName
        }
        if(email) {
            user.email = email
        }
        if(phoneNumber) {
            user.phoneNumber = phoneNumber 
        }
        if(bio) {
            user.profile.bio = bio
        }
        if (skillArray.length > 0){ 
            user.profile.skills = skillArray
        }; 

        // resume 

        await user.save()


        user= {
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }
        return res.status(200).json({
            message:'proffile update successfully',
            user,
            success : true
        })

    } catch (error) {
        console.log(error)
    };
};