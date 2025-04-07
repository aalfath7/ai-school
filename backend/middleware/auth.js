const jwt = require("jsonwebtoken");

module.exports = function (roles = []) {
  return function (req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token" });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      if (roles.length && !roles.includes(verified.role)) {
        return res
          .status(403)
          .json({ message: "Access Forbidden: Unauthorized Role" });
      }

      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};
