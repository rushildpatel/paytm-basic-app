require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/db");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1]; // "bearer <token>"
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({
      _id: _id,
    });

    req.userId = _id;

    next();
  } catch (error) {
    res.status(403).json({ error: "Request is not authorized" });
  }
};

module.exports = {
  authMiddleware,
};
