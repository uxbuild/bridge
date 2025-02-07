// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to protect routes and ensure the user authenticated
const protect = async (req, res, next) => {
  console.log("*************");
  console.log("middleware protect headers", req.headers.authorization);

  let token;

  // Check for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token,  attach user to request
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // proceed to next middleware..
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// generalized: checking authenticated user owns resource referenced in request..
const checkOwnership = (model, paramName) => async (req, res, next) => {
  console.log('***********');
  console.log('middleware checkownership ', `model:${model}, param:${paramName}`);
  
    // req.param ids might be different..
    const resourceId = Number(req.params[paramName]);
    // get user id from middleware updated request..
    const userId = req.user.userId;
  
    if (!resourceId) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }
  
    try {
      // get resource..
      const resource = await prisma[model].findUnique({
        where: { id: resourceId },
      });
      // check resource..
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      // check ownership..
      if (resource.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      // pass to next middleware..
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { protect, checkOwnership };
