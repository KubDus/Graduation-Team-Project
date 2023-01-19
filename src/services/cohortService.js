import { cohortRepository } from "../repositories/cohortRepository";
import { classRepository } from "../repositories/classRepository";
import utils from "../utils/utils";
import { dashboardRepository } from "../repositories/dashboardRepository";

class CohortService {

    async createCohort(cohortToCreate) {

        // check if cohort already exists
        if (await cohortRepository.getCohortByName(cohortToCreate.name)) {
            return utils.errorResponse(409, "Cohort name already used.")
        }

        if (!cohortToCreate.name) {
            return utils.errorResponse(400, "Provide at least a cohort name.")
        }

        // create cohort
        await cohortRepository.createCohort(cohortToCreate);
        return utils.messageResponse(200, "Cohort created.");
    }


    async getAllActiveCohorts() {
        return await cohortRepository.getAllActiveCohorts();
    }

    async deleteCohortById(cohortId) {  
        const possibleCohort = await cohortRepository.getCohortById(cohortId);

        if (!possibleCohort) {  
            return utils.errorResponse(404, "Such a cohort does not exist.")
        }

        if (possibleCohort && possibleCohort.status === "SOFT-DELETED") {
            return utils.messageResponse(200, "Cohort was already deleted.")
        }

        await classRepository.deleteCohortInClasses(possibleCohort.name);
        await dashboardRepository.deleteCohortsInApprenticeship(cohortId);
    
        return await cohortRepository.deleteCohort(cohortId);
    }

    async updateCohortById(cohortId, updateTo) {

        if (!await cohortRepository.getCohortById(cohortId)) {
            return utils.errorResponse(404, "Such a cohort does not exist.")
        }

        if (await cohortRepository.getCohortByName(updateTo.name)) {
            const cohortWithTheNameToUpdateTo = await cohortRepository.getCohortByName(updateTo.name);

            console.log(updateTo.name)

            // If the cohort name already exists and it is the name of a current cohort to be updated.
            if (cohortWithTheNameToUpdateTo.id != cohortId) {
                return utils.errorResponse(409, "Such a cohort name already exists.")
            }
        }

        return await cohortRepository.updateCohort(cohortId, updateTo);
    }

    async getCohortInfoById(id) {
        const cohort = await cohortRepository.getCohortById(id);

        if (cohort) {
            const relatedClasses = await classRepository.getClassesRelatedToCohort(cohort.name);

            // get classes names only
            var classesNamesOnly = relatedClasses.map(element => element.name);
            // check if object is empty
            if (Object.keys(classesNamesOnly).length === 0) { classesNamesOnly = "No classes" };

            return utils.jsonResponse(200, {
                cohortDetails: cohort,
                cohortsClasses: classesNamesOnly
            })
        }
        return utils.errorResponse(404, "Cohort not found");

    }
}

const cohortService = new CohortService();
export { cohortService };
