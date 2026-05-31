const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
    const headerAuth = req.header("Authorization");

    if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied no token" })
    };

    const token = headerAuth.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = requireAuth;