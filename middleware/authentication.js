const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).send("You are not authorized. Login First");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      citizenshipNumber: payload.citizenshipNumber,
    };
    next();
  } catch (e) {
    res.status(401).send("Authentication Invalid");
    console.log(e);
  }
};
module.exports = auth;