const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRoute);
app.use('/api/job',jobRoute)

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("connected to mongoDB");
})    
.catch(() => {
    console.log("error connecting to mongoDB");
    
})    

app.listen(PORT,() => console.log("server is listening on port 3000..."));