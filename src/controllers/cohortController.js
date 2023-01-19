import { cohortService } from "../services/cohortService";

class CohortController {

    async createCohort(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await cohortService.createCohort(req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can create cohort.");
        }
    }

    async getAllActiveCohorts(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await cohortService.getAllActiveCohorts();
            res.status(200).send(response);
        } else {
            res.status(405).send("Only admin or mentor can see classes.");
        }
    }

    async deleteCohort(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await cohortService.deleteCohortById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can delete a class.");
        }
    }

    async updateCohort(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await cohortService.updateCohortById(req.params.id, req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can update a class.");
        }
    }

    async getCohortInfo(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await cohortService.getCohortInfoById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see class info.");
        }
    }
}

const cohortController = new CohortController();

export { cohortController };