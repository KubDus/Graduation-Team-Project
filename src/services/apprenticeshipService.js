import { apprenticeshipRepository } from "../repositories/apprenticeshipRepository";
import { userRepository } from "../repositories/userRepository";
import utils from "../utils/utils";
import { dashboardRepository } from "../repositories/dashboardRepository";
import { util } from "chai";

class ApprenticeshipService {

    async createApprenticeship(apprenticeshipToCreate) {

        const userApprentice = await userRepository.getUserById(apprenticeshipToCreate.user);
        if (!userApprentice) {
            return utils.errorResponse(400, "Bad request, not existing user id.");
        }
        if (userApprentice.role != "apprentice") {
            return utils.errorResponse(403, "User's role is not apprentice. Apprenticeship not created.");
        }

        if (!apprenticeshipToCreate.user || 
            !apprenticeshipToCreate.cohort || 
            !apprenticeshipToCreate.class ||
            !apprenticeshipToCreate.phase) {
            return utils.errorResponse(400, "Provide all required fields.");
        }
        // create apprenticeship
        const apprenticeship = await apprenticeshipRepository.createApprenticeship(apprenticeshipToCreate);
        if (!apprenticeship) {
            return utils.errorResponse(417, "Bad database response.");
        }
        return utils.messageResponse(200, "Apprenticeship created.");
    }


    async getAllEnabledApprenticeships() {
        const apprenticeships = await apprenticeshipRepository.getAllEnabledApprenticeships();

        if (apprenticeships) {
            return utils.messageResponse(200, apprenticeships);
        }
        return errorResponse(404, "Some error occurred.");
    }

    async deleteApprenticeshipById(apprenticeshipId) {
        const apprenticeship = await apprenticeshipRepository.getApprenticeshipById(apprenticeshipId);

        if (!apprenticeship) {
            return utils.errorResponse(404, "Such an apprenticeship does not exist.");
        }
        if (apprenticeship && apprenticeship.status === "SOFT-DELETED") {
            return utils.messageResponse(200, "Apprenticeship was already deleted.");
        }
        // await dashboardRepository.deleteClassesInApprenticeship(apprenticeshipId);
        const deleted = await apprenticeshipRepository.deleteApprenticeship(apprenticeshipId);
        if (!deleted) {
            return utils.errorResponse(417, "Bad database response.");
        }
        return utils.messageResponse(200, "Apprenticeship deleted.");
    }

    async updateApprenticeshipById(apprenticeshipId, updateTo) {
        const apprenticeshipToUpdate = await apprenticeshipRepository.getApprenticeshipById(apprenticeshipId);
        if (!apprenticeshipToUpdate) {
            return utils.errorResponse(404, "Such an apprenticeship does not exist.");
        }
        if (updateTo.id || updateTo.user || updateTo.cohort || updateTo.class || updateTo.phase) {
            return utils.errorResponse(400, "This field can not be updated.");
        }
        
        const updatedApprenticeship = await apprenticeshipRepository.updateApprenticeship(apprenticeshipId, updateTo);
        if (!updatedApprenticeship) {
            return utils.errorResponse(417, "Bad database response.");
        } else {
            return utils.messageResponse(200, "Updated.");
        }
    }

    async getApprenticeshipsById(apprenticeshipId) {
        const apprenticeships = await apprenticeshipRepository.getApprenticeshipById(apprenticeshipId);

        if (apprenticeships) {
            return utils.jsonResponse(200, apprenticeships);
        }
        return utils.errorResponse(404,"Apprenticeship not found");
    }

}

const apprenticeshipService = new ApprenticeshipService();
export { apprenticeshipService };