const jwt = require('jsonwebtoken');



// This middleware function is used to protect routes by ensuring that a valid JWT token is included in the request header. It checks whether the user is authorized to access certain routes and verifies the token's authenticity. If the token is valid, the user can proceed with the request; otherwise, an error is returned.

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;


// Summary of Each Part:
// JWT Library: Imports jsonwebtoken for decoding and verifying JWT tokens.

// Middleware: Defines the authMiddleware function to be applied to routes.

// Extract Token: Retrieves the token from the request header.
// Token Check: If no token is present, the function returns a 401 Unauthorized error.
// Verify Token: If a token is provided, the middleware verifies the token using a secret key.
// Attach User Data: If the token is valid, the decoded user data is attached to the req.user object.
// Proceed to Next Middleware: Calls next() to allow the request to continue to the next middleware or route handler.
// Handle Errors: If the token is invalid, responds with a 403 Forbidden error.
// Export Middleware: The middleware is exported to be used in protected routes.