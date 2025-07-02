import {Application }from '../models/application.model.js';

export const applyJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;
        if (!userId || !jobId) {
            return res.status(400).json({
                message: "Invalid request",
                success: false
            })
        }
        const existingApplication = await Application.findOne({
            job: jobId,
            user: userId
        })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        };
        const job = await job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        const newApplication = new Application({
            job: jobId,
            applicant : userId
        });
        job.applicantions.push(newApplication.id);
        await job.save();
        return res.status(201).json({
            message: "Application submitted",
            success: true,
        });
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user._id;
        const application = await Application.find({ applicant : userId }).sort({createdAt : -1}).populate({path : 'company', option : {sort : {createdAt : -1}
        }
    });
    if (!application) {
        return res.status(404).json({
            message: "No application found",
            success: false
        })
    };
    return res.status(200).json({
        message: "Applications found",
        success: true,
        application
    });
    } catch (error) {
        console.log(error)
    }
}


export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await job.findById(jobId).populate({
            path : 'applications',
            options : {sort:{createdAt: -1}} ,
            populate : {path : 'applicant'}
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        };
         return res.status(200).json({
             message: "Applicants found",
             success: true,
             job
         });
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Invalid request",
                success: false
            })
        }
        const application = await Application.findOne({ _id : applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Application updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}