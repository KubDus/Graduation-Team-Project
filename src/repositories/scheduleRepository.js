import Schedule from "../models/schedule";

class ScheduleRepository {

    createSchedule(scheduleToCreate) {
        return Schedule.create(scheduleToCreate);
    }

    async getScheduleById(scheduleId) {
        try {
            return await Schedule.findByPk(scheduleId);
        } catch (error) {
            return null;
        }
    }

    async getSchedulesByClass(classId) {
        try {
            return await Schedule.findAll({ where: {class: classId }});
        } catch (error) {
            return null;
        }
    }

    async getSchedulesByClassAndPhase(classId, phaseTopic) {
        try {
            return await Schedule.findAll({ where: { class: classId, phase: phaseTopic }});
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async updateSchedule(updateTo, scheduleId) {
        try {
            const scheduleToUpdate = await Schedule.findByPk(scheduleId);
            
            if (updateTo.cohort) { scheduleToUpdate.cohort = updateTo.cohort };
            if (updateTo.class) { scheduleToUpdate.class = updateTo.class };
            if (updateTo.phase) { scheduleToUpdate.phase = updateTo.phase };
            if (updateTo.week) { scheduleToUpdate.week = updateTo.week };
            if (updateTo.day) { scheduleToUpdate.day = updateTo.day };
            if (updateTo.topic) { scheduleToUpdate.topic = updateTo.topic };
            if (updateTo.mentor) { scheduleToUpdate.mentor = updateTo.mentor };
            if (updateTo.dedication) { scheduleToUpdate.dedication = updateTo.dedication };

            return await scheduleToUpdate.save();
        } catch (error) {
            return null;
        }
    }

    async deleteSchedule(scheduleId) {
        try {
            return await Schedule.destroy({ where: { id: scheduleId }})
        } catch (error) {
            return null;
        }
    }
}

const scheduleRepository = new ScheduleRepository();
export { scheduleRepository };