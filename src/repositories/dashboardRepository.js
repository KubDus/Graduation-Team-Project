import Apprenticeship from "../models/apprenticeship";
import Class from "../models/class";
import Cohort from "../models/cohort";
import Mentorship from "../models/mentorship";
import User from "../models/user";

class DashboardRepository {

    async getRecords(user) {
        try {
            const records = await this.getRecordsByUserIdAndRole(user.id, user.role);
            const recordArray = [];

            for (const element of records) {
                const cohort = await Cohort.findByPk(element.cohort);
                const classObj = await Class.findByPk(element.class);
                const apprentices = await this.getApprenticeArray(element.cohort, element.class, element.phase);
                const mentors = await this.getMentorArray(element.cohort, element.class, element.phase, user.role);

                var result = {
                    cohort: cohort.name,
                    class: classObj.name,
                    phase: element.phase,
                    startDate: element.startdate,
                    endDate: element.enddate,
                    apprentices: apprentices,
                    mentors: mentors
                };
                
                recordArray.push(result);
            }
    
            return recordArray;
        } catch (error) {
            return null;
        }
    }

    async getRecordsByUserIdAndRole(userId, role) {
        try {
            if (role === "apprentice") {
                return await Apprenticeship.findAll({ where: { user: userId }});
            }
            if (role === "mentor") {
                return await Mentorship.findAll({ where: { user: userId }})
            }
            if (role === "admin" || role === "mentor + admin") {
                const mentorships = await Mentorship.findAll();
                const apprenticeships = await Apprenticeship.findAll();
                return mentorships.concat(apprenticeships);
            }
        } catch (error) {
            return null;
        }
    }

    async getApprenticeArray(cohortId, classId, phase) {
        const apprenticeships = await Apprenticeship.findAll({ where: { cohort: cohortId, class: classId,  phase: phase }});
        const apprenticeArray = [];
        for (const element of apprenticeships) {
            try {
                const apprentice = await User.findByPk(element.user);
                apprenticeArray.push({
                    id: apprentice.id,
                    username: apprentice.username,
                    fullname: apprentice.firstName + " " + apprentice.lastName,
                    email: apprentice.email
                });
            } catch (error) {
                continue;
            }
        }
        return apprenticeArray;
    }

    async getMentorArray(cohortId, classId, phase, role) {
        const mentorships = await Mentorship.findAll({ where: { cohort: cohortId, class: classId,  phase: phase }});
        const mentorArray = [];
        for (const element of mentorships) {
            try {
                const mentor = await User.findByPk(element.user);
                mentorArray.push({
                    id: mentor.id,
                    username: mentor.username,
                    fullname: mentor.firstName + " " + mentor.lastName,
                    email: mentor.email,
                    startDate: element.startdate,
                    endDate: element.enddate,
                    dedication: (role != "apprentice") ? element.dedication : undefined
                });
            } catch (error) {
                return [];
            }
        }
        return mentorArray;
    }
    
    // Cascading after class is set to disabled.
    async deleteClassesInApprenticeship(classId) {

        Apprenticeship.findAll({ where: { class: classId } }).then((result) => {
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    result[i].class = null
                    result[i].save();
                }
            }
        })
    }

    async deleteCohortsInApprenticeship(cohortId) {

        Apprenticeship.findAll({ where: { cohort: cohortId } }).then((result) => {
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    result[i].cohort = null
                    result[i].save();
                }
            }
        })
    }

    async getApprenticesByClass(classId) {
        const apprenticeships = await Apprenticeship.findAll({ where: { class: classId }});
        const apprenticeArray = [];
        for (const element of apprenticeships) {
            try {
                const apprentice = await User.findByPk(element.user);
                apprenticeArray.push({
                    fullname: apprentice.firstName + " " + apprentice.lastName,
                    email: apprentice.email
                });
            } catch (error) {
                continue;
            }
        }
        return apprenticeArray;
    }np
}

const dashboardRepository = new DashboardRepository();
export { dashboardRepository };