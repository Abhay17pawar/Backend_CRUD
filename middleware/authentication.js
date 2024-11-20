const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); 
    if (!token) {
        return res.status(401).send("Access denied, please provide a token");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 

        next();
    } catch (error) {
        return res.status(400).send("Invalid token");
    }
};

module.exports = verifyToken;
