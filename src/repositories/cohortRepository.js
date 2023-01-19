import Cohort from "../models/cohort";
import utils from "../utils/utils";

class CohortRepository {

    createCohort(cohortToCreate) {
        return Cohort.create(cohortToCreate);
    }

    async getCohortById(id) {
        try {
            return await Cohort.findByPk(id);
        } catch (err) {
            return null;
        }
    }

    async getCohortByName(name) {
        try {
            return await Cohort.findOne({ where: { name: name } });
        } catch (err) {
            return null;
        }
    }

    async getAllActiveCohorts() {
        try {
            return await Cohort.findAll({ attributes: ['id', 'name', 'country'], where: { status: "ACTIVE" } })
        } catch (err) {
            return null;
        }
    }

    async deleteCohort(cohortId) {
        try {
            const cohortToDelete = await Cohort.findByPk(cohortId);
            cohortToDelete.update({ status: "SOFT-DELETED" })
            return utils.messageResponse(200, "Cohort deleted.")
        } catch (err) {
            return utils.errorResponse(404, "Such a cohort does not exist.")
        }
    }

    async updateCohort(cohortId, updateTo) {
        try {
            var cohortToUpdate = await Cohort.findByPk(cohortId);

            if (updateTo.name) { cohortToUpdate.name = updateTo.name };
            if (updateTo.country) { cohortToUpdate.country = updateTo.country };
            if (updateTo.status == "ACTIVE") { cohortToUpdate.status = "ACTIVE" };

            await cohortToUpdate.save();

            return utils.messageResponse(200, "Updated.")
        } catch (err) {
            return utils.errorResponse(404, "Some problem occurred.")
        }
    }
}

const cohortRepository = new CohortRepository();
export { cohortRepository };
