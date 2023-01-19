import { mentorshipService } from "../services/mentorshipService";

class MentorshipController {

    async createMentorship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await mentorshipService.createMentorship(req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can create mentorship.");
        }
    }

    async getAllActiveMentorShips(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await mentorshipService.getAllEnabledMentorShips();
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see it.");
        }
    }

    async getMentorShipById(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await mentorshipService.getMentorshipById(req.params.id)
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see mentorship info.");
        }
    }

    async deleteMentorship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await mentorshipService.deleteMentorshipById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can delete an mentorship.");
        }
    }

    async updateMentorship(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await mentorshipService.updateMentorshipById(req.params.id, req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can update an mentorship.");
        }
    }
}

const mentorshipController = new MentorshipController();

export { mentorshipController };