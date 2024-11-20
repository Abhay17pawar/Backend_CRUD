const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req,res) => {

    const {username , email, password } = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).send("Please enter all the fields!");  
        }
    
        const existinguser = await User.findOne( {email} );
        if(existinguser){
            return res.status(400).send("User already exists with this email!");  
        }
         
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = new User({
            username : username,
            email : email,
            password : hashedPassword
        });
    
        await newUser.save();
    
        return res.status(201).json({
            message : "signup was successful!",
            username : username,
            email : email
        });

    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

const loginController = async (req,res) => {
    const { email , password } = req.body;

    try {
        if(!email || !password){
            return res.status(400).send("Please enter all the fields!");  
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("try again!");
        }

        const compare = await bcrypt.compare(password,user.password);
        if (!compare) {
            return res.status(400).send("Incorrect password");
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
        );


        return res.status(200).json({
            message: "Login successful",
            token,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        return res.status(500).send("Internal server error");
    }
    
}

module.exports = { signupController, loginController }