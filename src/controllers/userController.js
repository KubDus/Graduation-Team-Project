import { userService } from "../services/userService";
import { adminService } from "../services/adminService";


class UserController {

    async register(req, res) {
        if (req.isUserLoggedAdminOrMentor) { // register with token = auto-register
            const responseBody = await adminService.createUser(req.body);
            res.json(responseBody);
        } else if (req.isTokenPresent) {
            res.status(405).send("Please log in.");
        } else { // register without token = self-register
            const response = await userService.createUser(req.body);
            res.status(response.status).send(response.body);
        };
    };

    async confirm(req, res) {
        const responseFromServer = await userService.confirmUser(req.params.authenticationLink, req.roleFromToken, req.isTokenValid, req.isTokenPresent);
        res.status(responseFromServer.status).send(responseFromServer.body);
    };

    async getInfoById(req, res) {
        const response = await userService.getInfoById(req.params.id, req.tokenDecoded);
        res.status(response.status).send(response.body);
    };

    async getAllActiveUsers(req, res) {
        if (req.isUserLoggedAdmin) {          
            const response = await userService.getAllActiveUsers();             
            res.status(200).send(response);
        } else {
            res.status(405).send("Only admin or mentor can see all users.");            
        };
    };

    async login(req, res) {
        
        const response = await userService.login(req.body.email, req.body.password);
        res.status(response.status).send(response.body)
    }

    async updateUser(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await userService.updateUser(req.tokenDecoded,req.body, req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(403).send("Access denied!") 
        };
    };

    async deleteUser(req, res) {
        const response = await userService.deleteUser(req.tokenDecoded, req.params.id);
        res.status(response.status).send(response.body);
    };

    async forgottenPassword(req, res) {
        const response = await userService.forgottenPassword(req.body.identification);
        res.status(response.status).send(response.body);
    };

    async changingForgottenPassword(req, res) {
        const response = await userService.changingForgottenPassword(req.params.authentication);
        res.status(response.status).send(response.body);
    };

    async forgottenPasswordConfirm(req, res) {
        const response = await userService.changeForgottenPassword(req.body.password, req.params.authentication);
        res.status(response.status).send(response.body);
    };

    async getAdminPage(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await adminService.adminPage();
            res.status(response.status).send(response.body)
        } else {
            res.status(403).send("Access denied!")
        };   
    };

    async getUserPageBasedOnRole(req,res){
        if (req.isUserLoggedAdmin) {
            const response = await userService.userPage(req.tokenDecoded, req.body.behaveAs);
            res.status(response.status).send(response.body)
        } else {
            res.status(403).send("Access denied!")
        };
    };

    async enableUser(req,res) {
        if (req.isUserLoggedAdmin) {
            const response = await adminService.enableUser(req.params.id, req.tokenDecoded);
            res.status(response.status).send(response.body)
        } else {
            res.status(403).send("Access denied!")
        };
    };

    async updateUserPassword(req, res) {
        const response = await userService.updateUser(req.tokenDecoded, req.body, req.tokenDecoded.id);
        res.status(response.status).send(response.body);
    }
}

const userController = new UserController();
export { userController };
