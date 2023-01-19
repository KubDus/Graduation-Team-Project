const jwt = require("jsonwebtoken");
import utils from '../utils/utils';

const config = process.env;

const readToken = (req, res, next) => {
  var token = req.headers["x-access-token"];

  if (!token) {
    token = req.params.token;
  }

  var isTokenPresent = false  // boolean
  var canTokenBeRead = false  // boolean
  var decodedToken = null;    // json
  var isTokenValid = false;   // boolean
  var roleFromToken = null;   // String role
  var idFromToken = null;     // String id
  var emailFromToken = null   // String email
  var isUserLoggedAdmin = false // boolean
  var isUserLoggedMentor = false // boolean
  var isUserLoggedAdminOrMentor = false // boolean

  // If token is present, read it.
  if (token) {
    isTokenPresent = true;

    try {

      // full token in json format
      decodedToken = jwt.verify(token, config.TOKEN_KEY);

      // if you get here, then it was decoded
      canTokenBeRead = true;

      // is token valid (means validity not expired)
      if (utils.isTokenValid(decodedToken.expirationTime)) { isTokenValid = true }

      // get user role from token
      roleFromToken = decodedToken.role;

      // get user id from token
      idFromToken = decodedToken.id;

      // get email from token
      emailFromToken = decodedToken.email;

      // check if user is role admin and is logged in
      if (roleFromToken == "admin" || roleFromToken == "mentor + admin" && isTokenValid) { isUserLoggedAdmin = true }

      // check if user is role admin and is logged in
      if ((roleFromToken == "mentor" || roleFromToken == "mentor + admin" && isTokenValid)) { isUserLoggedMentor = true }

      // check if user is role admin / mentor and is logged in
      if ((roleFromToken == "admin" || roleFromToken == "mentor" || roleFromToken == "mentor + admin") && isTokenValid) { isUserLoggedAdminOrMentor = true }

    } catch (err) { }
  }

  // send everything out
  req.isTokenPresent = isTokenPresent;
  req.canTokenBeRead = canTokenBeRead;
  req.decodedToken = decodedToken;
  req.isTokenValid = isTokenValid;
  req.roleFromToken = roleFromToken;
  req.idFromToken = idFromToken;
  req.emailFromToken = emailFromToken;
  req.isUserLoggedAdmin = isUserLoggedAdmin;
  req.isUserLoggedMentor = isUserLoggedMentor;
  req.isUserLoggedAdminOrMentor = isUserLoggedAdminOrMentor;


  next();

};

export { readToken };