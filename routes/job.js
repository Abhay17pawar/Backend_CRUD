const express = require("express");
const { create, getAll, update, Delete, get } = require("../controllers/jobController");
const verifyToken = require("../middleware/authentication");
const router = express.Router();

router.post("/create",verifyToken,create);
router.get("/all", verifyToken,getAll);
router.put("/update/:id",verifyToken,update);
router.delete("/delete/:id",verifyToken,Delete);
router.get("/get/:id",verifyToken,get);

module.exports = router; 