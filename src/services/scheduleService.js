import Class from "../models/class";
import Phase from "../models/phase";
import { classRepository } from "../repositories/classRepository";
import { scheduleRepository } from "../repositories/scheduleRepository";
import utils from "../utils/utils";

class ScheduleService {

    async createSchedule(scheduleToCreate) {
        if (!scheduleToCreate.cohort || 
            !scheduleToCreate.class || 
            !scheduleToCreate.phase || 
            !scheduleToCreate.week || 
            !scheduleToCreate.day || 
            !scheduleToCreate.topic || 
            !scheduleToCreate.mentor || 
            !scheduleToCreate.dedication) {
            return utils.outputResponse("error", 400, "Please provide all the inputs.");
        }

        await scheduleRepository.createSchedule(scheduleToCreate);
        return utils.outputResponse("message", 200, "Schedule created successfully.");
    }

    async getScheduleById(scheduleId) {
        const schedule = await scheduleRepository.getScheduleById(scheduleId);

        if (!schedule) {
            return utils.outputResponse("error", 404, "A schedule with the specified id doesn't exist");
        }

        return utils.jsonResponse(200, schedule);
    }

    async getSchedulesByClass(classId) {
        if (!await Class.findByPk(classId)) {
            return utils.outputResponse("error", 404, "A class with the specified id doesn't exist");
        }

        const schedules = await scheduleRepository.getSchedulesByClass(classId);

        if (!schedules || schedules.length == 0) {
            return utils.outputResponse("error", 404, "There are no schedules for this class.");
        }

        return utils.jsonResponse(200, schedules);
    }

    async getSchedulesByClassAndPhase(classId, phaseId) {
        const phase = await Phase.findByPk(phaseId);
        if (!phase) {
            return utils.outputResponse("error", 404, "A phase with the specified id doesn't exist");
        }
        
        const classObj = await Class.findByPk(classId)
        if (!classObj) {
            return utils.outputResponse("error", 404, "A class with the specified id doesn't exist");
        }

        const schedules = await scheduleRepository.getSchedulesByClassAndPhase(classObj.id, phase.topic);

        if (!schedules || schedules.length == 0) {
            return utils.outputResponse("error", 404, "There are no schedules for this class/phase combination.");
        }

        return utils.jsonResponse(200, schedules);
    }

    async updateSchedule(updateTo, scheduleId) {
        
        if (!await scheduleRepository.getScheduleById(scheduleId)) {
            return utils.outputResponse("error", 404, "A schedule with the specified id doesn't exist");
        }
        const updatedSchedule = await scheduleRepository.updateSchedule(updateTo, scheduleId);

        if (!updatedSchedule) {
            return utils.outputResponse("error", 404, "An error occured.")
        }

        return utils.outputResponse("message", 200, "Schedule updated.")
    }

    async deleteSchedule(scheduleId) {

        if (!await scheduleRepository.getScheduleById(scheduleId)) {
            return utils.outputResponse("error", 404, "A schedule with the specified id doesn't exist");
        }
        const deletedSchedule = await scheduleRepository.deleteSchedule(scheduleId);
        
        if (!deletedSchedule) {
            return utils.outputResponse("error", 404, "An error occured.")
        }

        return utils.outputResponse("message", 200, "Schedule deleted.")
    }
}

const scheduleService = new ScheduleService();
export { scheduleService };