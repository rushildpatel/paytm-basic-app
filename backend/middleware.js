require("dotenv").config();

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Auth failed errors",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    console.log(req.userId);
    console.log("token authorized");
    next();
  } catch (err) {
    return res.status(403).json({ message: "Auth failed errors" });
  }
};

module.exports = {
  authMiddleware,
};
