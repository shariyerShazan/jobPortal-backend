import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
    },
    password: {
        type : String || Number,
        required: true,
    },
    phoneNumber: {
        type : Number,
        required: true,
    },
    role: {
        type:String,
        enum: ['student' , 'recruiter'],
        required: true,
    },
    profile: {
        bio:{
           type: String,
        },
        skill:[{type : String}],
        resume: {
            type: String
        },
        resumeOiriginalName :{
             type: String,
        },
        company :{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Company',
        },
        profilePhoto:{
            type: String,
            default: ''
        }
    },
}, {timestamps : true})

export const User = mongoose.model("User" , userSchema);