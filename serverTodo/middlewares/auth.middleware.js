const { getUser } = require("../utils/auth.utils");

const checkForAuthentication = (req, res, next) => {
  const tokenCookieValue = req.cookies.token;
  if (!tokenCookieValue) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = getUser(tokenCookieValue);
    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = { checkForAuthentication };