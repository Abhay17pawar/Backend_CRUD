const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['interview' , 'declined', 'pending'],
        defualt : 'pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Job',jobSchema);