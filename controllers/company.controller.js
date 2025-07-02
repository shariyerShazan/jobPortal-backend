import {Company }from '../models/company.model.js'

export const registerCompnay = async (req , res)=>{
    try {
        const {companyNamne} = req.body;
        if(!companyNamne){
            return res.status(400).json({
                message : 'compnay name ie required',
                success: false
            })
        }
        let company = await Company.findOne({name:companyNamne});
        if(company){
            return res.status(400).json({
                messege: "you can't register same company",
                success: false
            })
        }
        company = await company.create({
            name: companyNamne,
            userId :req.id
        })
        return res.status(201).json({
            message : 'company register successfully',
            company,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
};

export const getCompany = async (req , res)=>{
    try {
        const company = await Company.find({userId : req.id})
        if(!company){
            return res.status(400).json({
                message : 'company not found',
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}




export const getCompanyById = async (req , res)=>{
    try {
        const company = await Company.findById(req.params.id)
        if(!company){
            return res.status(400).json({
                message : 'company not found',
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateCompany = async (req , res)=>{
    try {
        const {name, description , website , location } = req.body;
        const file = req.file;

        // cloudinary

        const updatedata = {
            name,
            description,
            website,
            location
        }
        const company = await Company.findByIdAndUpdate(req.params.id , updatedata , {new:true})

        if(!company){
            return res.status(400).json({
                message : 'company not found',
                success: false
            })
        }
         return res.status(200).json({
            message : 'company updated successfully',
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
        
    }
}