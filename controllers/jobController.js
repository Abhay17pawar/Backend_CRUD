const Job = require('../models/job.js');

const getAll = async (req,res) => {

    try {
        const allJobs = await Job.find({createdBy : req.user.userId});
    
        if(allJobs === ''){
            return res.send("No jobs");
        }
    
        res.send(allJobs);

    } catch (error) {
        return res.status(500).json({"error" : error});
    }
}

const get = async (req,res) => {

    const { id } = req.params;

    try {
        const job = await Job.findOne({_id : id, createdBy : req.user.userId});

        if(!job){
            return res.status(404).send("Job not found!");
        }

        return res.status(200).send(job);

    } catch (error) {
        return res.status(500).json({"error" : error});
    }

}

const update = async (req,res) => {

    const { id } = req.params;
    const { company, position } = req.body;

    try {

        const job = await Job.findByIdAndUpdate({_id : id, createdBy : req.user.userId});

        if(!job){
            return res.status(404).json({ msg: "Job not found" }); 
        }

        job.company = company || job.company; 
        job.position = position || job.position; 
        
        await job.save();
        res.status(200).send(job);

    } catch (error) {
        res.status(400).send(error);
    }
}

const Delete = async (req,res) => {

    const { id } = req.params;

    try {
        
        const Deletejob = await Job.findByIdAndDelete({_id : id, createdBy : req.user.userId});

        if (!Deletejob) {
            return res.status(404).json({ msg: "Job not found" });
        }

        res.status(200).json({ msg: "Job deleted successfully", job: Deletejob });

    } catch (error) {
        res.status(400).send(error);
    }

}

const create = async (req,res) => {
    
    const {company, position} = req.body;

    try {
        const newJob = new Job({
            company : company,
            position : position,
            createdBy : req.user.userId
        });

        await newJob.save();
        return res.status(201).json({
            msg : newJob
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    

}

module.exports = { create, get, getAll, update, Delete }