const jwt = require("jsonwebtoken");
import utils from '../utils/utils';

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication :(");
  }

  try {
    // decode token
    const readToken = jwt.verify(token, config.TOKEN_KEY);

    // send decoded token to controller
    req.tokenDecoded = readToken;

    if (!utils.isTokenValid(readToken.expirationTime)){
      return res.status(401).send("Token expired");
    }

    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export { verifyToken };

