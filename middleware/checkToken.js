const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "please login...",
                error: true,
                success: false
            });
        }

        // Verify token
        jwt.verify(token, process.env.TOKEN_SECRET_VITE, function (err, decoded) {
            if (err) {
                console.log('Error in checkToken:', err);
                return res.status(401).json({
                    message: 'Unauthorized: Invalid or expired token',
                    error: true,
                    success: false
                });
            }

            if (decoded) {
                req.userId = decoded._id; // Attach user ID to request
                next();
            } else {
                return res.status(401).json({
                    message: "Unauthorized: Token could not be decoded",
                    error: true,
                    success: false
                });
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = checkToken;
