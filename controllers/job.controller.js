export const postJob = async (req, res) => {
    try {
        const { title , description , requirements , location , salary ,jobType , experiance , posisition , companyId } = req.body;
        if (!title || !description || !requirements || !location || !salary || !jobType || !experiance || !posisition || !companyId) {
            return res.status(400).json({ 
                message: "Please fill all fields",
                success: false
             });
        }
        const job = await job.create({
            title,
            description,
            requirements: requirements.split(','),
            location,
            salary : Number(salary),
            jobType,
            experianceLevel : experiance,
            posisition,
            company : companyId ,
            createdBy : req.user._id
        })
        return res.status(201).json({
            message: "Job created successfully",
            success: true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or : [
                { title : { $regex : keyword , $options : 'i'}},
                { description : { $regex : keyword , $options : 'i'}},
                { requirements : { $regex : keyword , $options : 'i'}},
            ]
        };
        const jobs = await jobs.find(query).populate({path:'company'}).sort({createdAt : -1});
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        };
        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        })
    } catch (error) {
        console.log(error)
    }        
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        };
        res.status(200).json({
            message: "Job found",
            success: true,
            job
        });
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        const jobs = await jobs.find({ createdBy : adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        };
        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error)
    }
};