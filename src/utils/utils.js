import bcrypt from "bcrypt";

class Utils {

  async generateRegistrationToken(user, hourValidity) {

    var expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + hourValidity);

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        expirationTime: expirationTime,
      },
      process.env.TOKEN_KEY
    );
    return token;
  }

  readToken(token) {
    var decodedToken = null;
    try {
      
      // full token in json format
      decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {  
      console.log("Token not readable." + err.message);
     }
    return decodedToken;
  };

  isTokenValid(tokenExpirationTime) {
    // get current time
    const timeNow = new Date();

    /* Needs to be parsed. String comes from the token (json). But also timeNow need to be parsed.
    Both dates are switched to milliseconds from 1.1.1970 and then compared. */
    return Date.parse(tokenExpirationTime) >= Date.parse(timeNow);
  }

  isPasswordStrongEnough(password) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return reg.test(password);
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  }

  async passwordVerification(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  outputResponse(responseType, status, messageText) {
    if (responseType === "message") {
      return this.messageResponse(status, messageText)
    } else if (responseType === "error") {
      return this.errorResponse(status, messageText)
    } else {
      return this.errorResponse(500, "Unknown response type of message")
    }
  }
  messageResponse(status, messageText) {
    return {
      body: { message: messageText },
      status: status,
    };
  }

  errorResponse(status, messageText) {
    return {
      body: { error: messageText },
      status: status,
    };
  }

  jsonResponse(status, body) {
    return {
      status: status,
      body: body
    };
  }


  async generateAuthenticationLink(numOfSymbols) {
    return await this.generateRandomString(numOfSymbols);
  }

  async generateRandomPassword(numOfSymbols) {
    return await this.generateRandomString(numOfSymbols);
  }

  async generateRandomString(numOfSymbols) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < numOfSymbols; i++) {
      randomString += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }
    return randomString;
  }


  emailConfirmationBody(link) {
    let mailBody = `<p>Dear user,<br><br> 
      Please confirm your registration on this 
      <a href=http://localhost:${process.env.PORT}/registration/confirmation/${link}>link!</a> <br><br>
      With love <br><br>
      Your N-ErrOps team
      </p>`
    return mailBody;
  }

  emailConfirmationBodyWithDefaultPassword(link, password) {
    let mailBody = `<p>Dear user,<br><br> 
    Please confirm your registration on this 
    <a href=http://localhost:${process.env.PORT}/registration/confirmation/${link}>link!</a> <br><br>
    Your default password is ${password}<br><br>
    With love <br><br>
    Your N-ErrOps team
    </p>`
    return mailBody;
  }

  emailChangeForgottenPasswordLink(user) {
    let mailBody = `<p>Dear ${user.username},<br><br>
    Please click on this 
    <a href=http://localhost:${process.env.PORT}/registration/forgotten/set-password/${user.authenticatonLink}>link </a> 
    to set your new password. <br><br>
    With love <br><br>
    Your N-ErrOps team
    </p>`
    return mailBody;
  }

  async isValidDate(d) {
    var date = new Date(d);
    if ((date instanceof Date && !isNaN(date.valueOf())) && d.length == 10) {
      return false
    } else {
      return true
    }
  }
}
const utils = new Utils();
export default utils;
