import { mentorshipRepository } from "../repositories/mentorshipRepository";
import { userRepository } from "../repositories/userRepository";
import utils from "../utils/utils";


class MentorshipService {


    async createMentorship(mentorshipToCreate) {

        const userMentor = await userRepository.getUserById(mentorshipToCreate.user);
        if (!userMentor) {
            return utils.errorResponse(400, "Bad request, not existing user id.");
        }
        if (!userMentor.role.includes("mentor")) {
            return utils.errorResponse(403, "User's role is not mentor. Mentorship not created.");
        }

        if (!mentorshipToCreate.user ||
            !mentorshipToCreate.cohort ||
            !mentorshipToCreate.class ||
            !mentorshipToCreate.phase ||
            !mentorshipToCreate.dedication) {
            return utils.errorResponse(400, "Provide all required fields.");
        }
        // create mentorship
        const mentorship = await mentorshipRepository.createMentorship(mentorshipToCreate);
        if (!mentorship) {
            return utils.errorResponse(417, "Bad database response.");
        }
        return utils.messageResponse(200, "Mentorship created.");
    }

    async getAllEnabledMentorShips() {
        const mentorShips = await mentorshipRepository.getAllEnabledMentorShips();

        if (mentorShips) {
            return utils.jsonResponse(200, mentorShips);
        }
        return utils.errorResponse(404, "Some error occurred.");
    }

    async getMentorshipById(mentorshipId) {
        const mentorship = await mentorshipRepository.getMentorshipById(mentorshipId);

        if (mentorship) {
            return utils.jsonResponse(200, mentorship);
        }
        return utils.errorResponse(404, "Mentorship not found");
    }

    async deleteMentorshipById(mentorshipId) {
        const mentorship = await mentorshipRepository.getMentorshipById(mentorshipId);

        if (!mentorship) {
            return utils.errorResponse(404, "Such an mentorship does not exist.");
        }
        if (mentorship && mentorship.status === "SOFT-DELETED") {
            return utils.messageResponse(200, "Mentorship was already deleted.");
        }

        const deleted = await mentorshipRepository.deleteMentorship(mentorshipId);
        if (!deleted) {
            return utils.errorResponse(417, "Bad database response.");
        }
        return utils.messageResponse(200, "Mentorship deleted.");
    }

    async updateMentorshipById(mentorshipId, updateTo) {
        const mentorshipToUpdate = await mentorshipRepository.getMentorshipById(mentorshipId);

        if (!mentorshipToUpdate) {
            return utils.errorResponse(404, "Such an mentorship does not exist.");
        }
        if (updateTo.id || updateTo.user || updateTo.cohort || updateTo.class || updateTo.phase) {
            return utils.errorResponse(400, "This field can not be updated.");
        }

        const updatedMentorship = await mentorshipRepository.updateMentorship(mentorshipId, updateTo);
        if (!updatedMentorship) {
            return utils.errorResponse(417, "Bad database response.");
        } else {
            return utils.messageResponse(200, "Updated.");
        }
    }

}

const mentorshipService = new MentorshipService();
export { mentorshipService };