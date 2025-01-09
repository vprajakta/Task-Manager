const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // // Ensure that the Authorization header exists and has the proper format
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     return res.status(401).json({ message: "Access denied. No token provided." });
    // }

    const token = authHeader.split(' ')[1];

    // If no token is provided after "Bearer", return a 401 error
    if (!token) {
        return res.status(401).json({ message: "Access denied. Token is missing." });
    }

    jwt.verify(token, "tcmTM", (err, user) => {
        if (err) {
            // Log the error to debug (especially during development)
            console.error("JWT verification error:", err);

            return res.status(403).json({ message: "Token is invalid or expired." });
        }
        // Attach the decoded user to the request object
        req.user = user;
        next(); // Proceed to the next middleware/handler
    });
};

module.exports = { authenticateToken };