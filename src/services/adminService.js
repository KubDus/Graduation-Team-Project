import { userRepository } from "../repositories/userRepository";
import { sendEmail } from "./emailService";
import utils from "../utils/utils";
import Status from "../models/status";

class AdminService {

    async createUser(newUser) {

        const nonHashedPassword = await utils.generateRandomPassword(10);

        if (!newUser.email) {
            return utils.errorResponse(405, "No Email provided!");
        }
        let userWithSuchEmail = await userRepository.getUserByEmail(newUser.email);
        if (userWithSuchEmail) {        
            return utils.errorResponse(405, "There already is a user with the same email.") 
        }
        var authenticationLink = "";
        do {
            authenticationLink = await utils.generateAuthenticationLink(48);
            var collisionUser = await userRepository.getUserByAuthenticationLink(
                authenticationLink
            );
        } while (!authenticationLink || collisionUser);  

        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);

        newUser.authenticationLink = authenticationLink;
        newUser.authenticationExpiration = expiration;
        newUser.role = "apprentice";
        newUser.status = "EMAIL_SENT";        
        newUser.password = utils.hashPassword(nonHashedPassword);        
        
        const user = await userRepository.createUser(newUser);
        if (!user) {
            return utils.errorResponse(403, "Unknown database error.")
        }
        let mailBody = utils.emailConfirmationBodyWithDefaultPassword(user.authenticationLink, nonHashedPassword);

        sendEmail(user, mailBody);
        return utils.messageResponse(200, "Request for registration was submitted. Email was sent to confirm registration.")
    }

    async adminPage (){
        const users = await userRepository.getAllUsersByStatus("DISABLED");
        if (users.length > 0) {      
            return utils.messageResponse(200,users);
        } else {
            return utils.messageResponse(200,"No users found with status disabled.")
        }
    }

    async enableUser(id){
        const user = await userRepository.getUserById(id);
        userRepository.changeUserStatus(user,"EMAIL_SENT");
        let mailBody = utils.emailConfirmationBody(user.authenticationLink);
        sendEmail(user, mailBody);
        return utils.messageResponse(200,"Email send.")
    }
}

const adminService = new AdminService();
export { adminService };