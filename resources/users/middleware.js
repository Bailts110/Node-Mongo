const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authorize = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token is invalid" });
        }
        req.user_id = decoded.id; // Use 'id' because you signed the token with { id: user._id }
        next();
    });
};
