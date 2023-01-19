import { scheduleService } from "../services/scheduleService";

class ScheduleController {
    
    async createSchedule(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.createSchedule(req.body);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can create schedules.");
        }
    }

    async getScheduleById(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.getScheduleById(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can see schedules.");
        }
    }

    async getSchedulesByClass(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.getSchedulesByClass(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can see schedules.");
        }
    }

    async getSchedulesByClassAndPhase(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.getSchedulesByClassAndPhase(req.params.classId, req.params.phaseId);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can see schedules.");
        }
    }

    async updateSchedule(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.updateSchedule(req.body, req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can update schedules.");
        }
    }

    async deleteSchedule(req, res) {
        if (req.isUserLoggedAdmin) {
            const response = await scheduleService.deleteSchedule(req.params.id);
            res.status(response.status).send(response.body);
        } else {
            res.status(405).send("Only users with admin privileges can delete schedules.");
        }
    }
}

const scheduleController = new ScheduleController();
export { scheduleController };