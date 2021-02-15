const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // const token = req.header("x-auth-token");
    let token = req.get("authorization");
       // Remove Bearer from string
       token = token.slice(7);
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
        // veryfy token 
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
