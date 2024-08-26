const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token is missing');
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }

    // Attach decoded token to request object for further use
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
