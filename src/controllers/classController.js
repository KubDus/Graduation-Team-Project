import { classService } from "../services/classService";

class ClassController {

    async createClass(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await classService.createClass(req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can create class.");
        }
    }

    async getAllActiveClasses(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await classService.getAllActiveClasses();
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see classes.");
        }
    }

    async deleteClass(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await classService.deleteClassById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can delete a class.");
        }
    }

    async updateClass(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await classService.updateClassById(req.params.id, req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin can update a class.");
        }
    }

    async getClassInfo(req, res) {
        if (req.isUserLoggedAdminOrMentor) {
            const response = await classService.getClassInfoById(req.params.id)
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only admin or mentor can see class info.");
        }
    }
}

const classController = new ClassController();

export { classController };