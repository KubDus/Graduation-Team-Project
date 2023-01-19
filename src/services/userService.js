import { userRepository } from "../repositories/userRepository";
import { sendEmail } from "../services/emailService";
import User from "../models/user";
import utils from "../utils/utils";



const jwt = require("jsonwebtoken");


class UserService {

    async createUserTesting(user, userRepository) {

        if (!this.areInputsProvided(user)) {
            return utils.outputResponse("error", 401, "Missing email or password");
        }

        if (await userRepository.getUserByEmail(user.email)) {
            return utils.outputResponse("error", 409, "Email already exists!");
        }

        if (!utils.isPasswordStrongEnough(user.password)) {
            return utils.outputResponse("error", 403, "Password is not strong enough");
        }

        do {
            var authenticationLink = await utils.generateAuthenticationLink(24);
            var possibleUser = await userRepository.getUserByAuthenticationLink(authenticationLink);
        } while (!authenticationLink || possibleUser);

        const userToDB = Object();
        userToDB.username = user.username
        userToDB.firstName = user.firstName
        userToDB.lastName = user.lastName
        userToDB.email = user.email
        userToDB.password = utils.hashPassword(user.password);
        userToDB.status = "DISABLED";
        userToDB.role = "apprentice";
        userToDB.authenticationLink = authenticationLink;

        if (await userRepository.createUser(userToDB)) {
            return utils.outputResponse("message", 200, "Admin received registration request. Once handled, email will be sent.");
        }
        return utils.outputResponse("error", 500, "Unknown error");
    }

    async createUser(user) {
        return await this.createUserTesting(user, userRepository)
    }

    async confirmUserTesting(link, userRole, isTokenValid, isTokenPresent, userRepository) {
        const possibleUser = await userRepository.getUserByAuthenticationLink(link);

        if (!possibleUser) {
            return utils.outputResponse("error", 404, "User not found");
        } else {

            if (possibleUser.status === "DISABLED") {

                if (isTokenPresent) {
                    if (!isTokenValid) {
                        return utils.outputResponse("error", 401, "Needs to log in");
                    } else {
                        if (userRole !== "admin") {
                            return utils.outputResponse("error", 400, "Only admin can process user activation.");
                        } else {
                            await userRepository.changeUserStatus(possibleUser, "EMAIL_SENT");
                            sendEmail(possibleUser, utils.emailConfirmationBody(link));
                            return utils.outputResponse("message", 200, "Email sent");
                        }
                    }
                }

                return utils.outputResponse("message", 200, "User is inactive, waiting for admin accept");
            }

            if (possibleUser.status === "ENABLED") {
                return utils.messageResponse(200, "User is active");
            }

            if (possibleUser.status === "EMAIL_SENT") {
                const activatedUser = await userRepository.changeUserStatus(
                    possibleUser,
                    "ENABLED"
                );

                if (activatedUser && activatedUser.status === "ENABLED") {
                    return utils.outputResponse("message", 200, "User was activated");
                } else {
                    return utils.outputResponse("error", 200, "Activation failed");
                }
            }
        }
    }

    async confirmUser(link, userRole, isTokenValid, isTokenPresent) {
        return await this.confirmUserTesting(link, userRole, isTokenValid, isTokenPresent, userRepository)
    }

    async loginUserTesting(email, password, userRepository) {
       
        // not all data provided
        if (!(email && password)) {
            
            return utils.outputResponse("error", 400, "Inputs not provided")
        }
        const user = await userRepository.getUserByEmail(email);

        // if user does not exist
        if (!user) { return utils.outputResponse("error", 404, "User does not exist (scrambled eggs)") }

        // if user is not active yet
        if (user.status !== "ENABLED") {
            return utils.outputResponse("error", 403, "User needs to be activated");
        }

        // bcrypt.compare to compare used password against hashed password in the database
        if (user && await utils.passwordVerification(password, user.password)) {
            try {
                const tokenJWTGenerated = await this.generateToken(user);
                return utils.outputResponse("message",200, tokenJWTGenerated);
            } catch (error) {
                return utils.outputResponse("error", 400, "Problem occurred.");
            }
        } else {
            return utils.outputResponse("error", 401, "Password is not correct");
        }
    }

    async login(email, password) {
        return await this.loginUserTesting(email, password, userRepository)
    }

    async getInfoById(idToGetInfo, userFromToken) {

        const possibleUser = await User.findByPk(idToGetInfo);

        if (
            userFromToken.id == idToGetInfo || // searching for yourself
            userFromToken.role === "admin" ||   // admin is searching
            userFromToken.role === "mentor + admin" ||
            (userFromToken.role === "mentor" && possibleUser && possibleUser.role !== "admin") // mentor can search for mentors and apprentices
        ) {

            if (possibleUser) {// admin gets all info
                if (userFromToken.role === "admin" || userFromToken.role === "mentor + admin") {
                    return {
                        body: possibleUser,
                        status: 200
                    }
                }
                return {
                    body: this.getSpecificInfoAboutUser(possibleUser),
                    status: 200
                };
            } else {
                return utils.errorResponse(404, "Not found");
            }
        } else {
            return utils.errorResponse(405, "Not allowed");
        }
    }

    async getAllActiveUsers() {
        return await userRepository.getAllUsersByStatus("ENABLED");
    }

    async updateUser(loggedUser, updateTo, userIdToUpdate) {
            let updatedUser = null;
            updateTo.password = null;

        if (updateTo.email && await userRepository.getUserByEmail(updateTo.email)) {
            const userWithEmailToUpdateTo = await userRepository.getUserByEmail(updateTo.email);

            if (userWithEmailToUpdateTo.id != userIdToUpdate) {
                return utils.errorResponse(409, "Email already used by another user.")
            }
        }

        if (updateTo.username && await userRepository.getUserByUsername(updateTo.username)) {
            const userWithUsernameToUpdateTo = await userRepository.getUserByUsername(updateTo.username);       
            if (userWithUsernameToUpdateTo.id != userIdToUpdate) {                    
                return utils.errorResponse(409, "Username already used by another user.")
            }
        }

        if (updateTo.oldPassword && updateTo.newPassword) {
            if (!utils.isPasswordStrongEnough(updateTo.newPassword)) {
                return utils.errorResponse(403, "New password is not strong enough");
            }
            const possibleUser = await userRepository.getUserById(userIdToUpdate);
            if (await utils.passwordVerification(updateTo.oldPassword, possibleUser.password)) {
                updateTo.password = utils.hashPassword(updateTo.newPassword);             
            } else {
                return utils.errorResponse(403, "Old password is not correct!")
            }
        }

        updatedUser = await userRepository.updateUser(updateTo, userIdToUpdate, loggedUser.role);

        if (updatedUser) {
            return utils.messageResponse(200, "User updated!")
        } else {
            return utils.errorResponse(403, "Invalid user!")
        };
    };

    async deleteUser(loggedUser, userIdToDelete) {
        if (loggedUser.role === "admin" || loggedUser.role === "mentor + admin") {

            const possibleUser = await userRepository.getUserById(userIdToDelete);

            // short circuiting
            if (possibleUser && await possibleUser.status === "SOFT-DELETED") {
                return utils.messageResponse(200, "User was already deleted.")
            }

            if (possibleUser) {
                if (possibleUser.id === loggedUser.id) {
                    return utils.errorResponse(405, "Admin can be deleted only by another admin, not by himself.")
                }

                await userRepository.deleteUser(userIdToDelete);
                return utils.messageResponse(200, "User deleted!")
            } else {
                return utils.errorResponse(403, "Invalid user!")
            }
        } else {
            return utils.errorResponse(401, "You dont have rights to do that!")
        }
    }

    areInputsProvided(user) {
        return !!(user.password && user.email);
    }

    getSpecificInfoAboutUser(originalUser) {
        return {
            firstName: originalUser.firstName,
            lastName: originalUser.lastName,
            username: originalUser.username,
            email: originalUser.email,
            role: originalUser.role
        };
    }

    async generateToken(user) {
        // set for how many minutes will be token valid
        const validityDuration = 120;

        var expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + validityDuration);

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

    async forgottenPassword(identification) {
        let possibleUser = await userRepository.getUserByEmail(identification);
        if (!possibleUser) {
            possibleUser = await userRepository.getUserByUsername(identification);
        }
        if (!possibleUser) {
            return utils.errorResponse(400, "Email or username unknown.");
        }
        var authenticationLink = "";
        do {
            authenticationLink = await utils.generateAuthenticationLink(48);
            var collisionUser = await userRepository.getUserByAuthenticationLink(
                authenticationLink
            );
        } while (!authenticationLink || collisionUser);
        console.log("authenticationLink: " + authenticationLink);

        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);

        console.log(expiration);
        possibleUser.authenticationLink = authenticationLink;
        possibleUser.authenticationExpiration = expiration;
        possibleUser.status = "EMAIL_SENT";
        const user = await userRepository.generalUpdateUser(possibleUser,
            ['status', 'authenticationLink', 'authenticationExpiration']);
        if (!user) {
            return utils.errorResponse(403, "Unknown database error.");
        }
        sendEmail(user, utils.emailChangeForgottenPasswordLink(user));
    // "Request accepted, email sended. Token is valid for 24 hours."
        return utils.jsonResponse(200, { "forgottenPasswordToken": authenticationLink });     
    }
    
    async changingForgottenPassword(authentication) {
        const possibleUser = await userRepository.getUserByLink(authentication);
        if (!possibleUser) {
            return utils.errorResponse(400, "User not identified.");
        }
        if (!utils.isTokenValid(possibleUser.authenticationExpiration)) {
            return utils.errorResponse(403, "Authentication Link expired. Please provide a new request.");
        }
        const jwtGenerated = await this.generateToken(possibleUser);
        return utils.messageResponse(200, jwtGenerated);
    }

    async changeForgottenPassword(password, authentication) {
        const possibleUser = await userRepository.getUserByLink(authentication);
        if (!possibleUser) {
            return utils.errorResponse(400, "User not identified.");
        }
        if (!utils.isTokenValid(possibleUser.authenticationExpiration)) {
            return utils.errorResponse(403, "Authentication Link expired. Please provide a new request.");
        }
        if (!utils.isPasswordStrongEnough(password)) {
            return utils.errorResponse(400, "Password is too weak.");
        }
        possibleUser.password = utils.hashPassword(password);
        possibleUser.status = "ENABLED";
        possibleUser.authenticationLink = null;
        possibleUser.authenticationExpiration = null;

        const user = await userRepository.generalUpdateUser(possibleUser, 
            ['status', 'password', 'authenticationLink', 'authenticationExpiration']);
        if (!user) {
            return utils.errorResponse(417, "Unknown database error.");
        }
        return utils.messageResponse(200, "New password successfully saved.");
    }

    async userPage(user, behaveAs) {
        try {
            if (user.role == "admin" || user.role == "mentor + admin" && behaveAs.toLowerCase() == "admin") {
                const users = await userRepository.findAllUsersAdminView();
                return {
                    body: users,
                    status: 200
                };
            } else if (user.role == "mentor" || user.role == "mentor + admin" && behaveAs.toLowerCase() == "mentor") {
                const users = await userRepository.findAllUsersMentorView();
                return {
                    body: users,
                    status: 200
                };
            } else if (user.role == "apprentice") {
                const users = await userRepository.findAllUsersApprenticeView(user);
                return {
                    body: users,
                    status: 200
                };
            } else {
                return utils.errorResponse(400, "Invalid input or token");
            }
        } catch (error) {
            if (!behaveAs) {return utils.errorResponse(400, "Missing attribute behaveAs")}
            else {return utils.errorResponse(400, "Error occurred!");};
        }
    }
}
const userService = new UserService();
export { userService };