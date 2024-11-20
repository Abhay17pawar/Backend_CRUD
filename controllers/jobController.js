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

}

const update = async (req,res) => {

}

const Delete = async (req,res) => {

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