
const getAll = async (req,res) => {

}

const get = async (req,res) => {

}

const update = async (req,res) => {

}

const Delete = async (req,res) => {

}

const create = async (req,res) => {
    console.log(req.user.username);
    console.log(req.user.userId);

}

module.exports = { create, get, getAll, update, Delete }