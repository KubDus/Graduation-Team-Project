import { apprenticeshipService } from "../services/apprenticeshipService";

class ApprenticeshipController {

    async createApprenticeship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await apprenticeshipService.createApprenticeship(req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can create apprenticeship.");
        }
    }

    async getAllActiveApprenticeships(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await apprenticeshipService.getAllEnabledApprenticeships();
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see it.");
        }
    }

    async deleteApprenticeship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await apprenticeshipService.deleteApprenticeshipById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can delete an apprenticeship.");
        }
    }

    async updateApprenticeship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await apprenticeshipService.updateApprenticeshipById(req.params.id, req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can update an apprenticeship.");
        }
    }

    async getApprenticeshipsById(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await apprenticeshipService.getApprenticeshipsById(req.params.id)
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see apprenticeship info.");
        }
    }

}

const apprenticeshipController = new ApprenticeshipController();

export { apprenticeshipController };