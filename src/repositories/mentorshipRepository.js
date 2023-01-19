import Mentorship from "../models/mentorship";
import utils from "../utils/utils";

class MentorshipRepository {

    async createMentorship(mentorshipToCreate) {
        try {
            return await Mentorship.create(mentorshipToCreate);
        } catch (err) {
            return null;
        }
    }

    async getAllEnabledMentorShips() {
        try {
            return await Mentorship.findAll({ attributes: ['id', 'user', 'cohort', 'class', 'phase', 'dedication'], where: { status: "ENABLED" } });
        } catch (err) {
            return null;
        }
    }

    async getMentorshipById(mentorshipId) {
        try {
            return await Mentorship.findOne({ where: { id: mentorshipId } });
        } catch (err) {
            return null;
        }
    }

    async deleteMentorship(mentorshipId) {
        try {
            const mentorshipToDelete = await Mentorship.findByPk(mentorshipId);
            mentorshipToDelete.update({ status: "SOFT-DELETED" });
            return mentorshipToDelete;
        } catch (err) {
            return null;
        }
    }

    async updateMentorship(mentorshipId, updateTo) {
        try {
            let mentorship = await Mentorship.findByPk(mentorshipId);

            if (updateTo.status) { mentorship.status = updateTo.status };
            if (updateTo.startdate) { mentorship.startdate = updateTo.startdate };
            if (updateTo.enddate) { mentorship.enddate = updateTo.enddate };
            if (updateTo.dedication) { mentorship.dedication = updateTo.dedication };

            return await mentorship.save();
        } catch (err) {
            return null;
        }
    }

}

const mentorshipRepository = new MentorshipRepository();
export { mentorshipRepository };
