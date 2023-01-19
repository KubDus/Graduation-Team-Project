import Apprenticeship from "../models/apprenticeship";
import utils from "../utils/utils";

class ApprenticeshipRepository {

    async createApprenticeship(apprenticeshipToCreate) {
        try {
            return await Apprenticeship.create(apprenticeshipToCreate);
        } catch (err) {
            return null;
        }
    }

    async getApprenticeshipById(apprenticeshipId) {
        try {
            //return await Apprenticeship.findByPk(id);
            return await Apprenticeship.findOne({ where: { id: apprenticeshipId } });
        } catch (err) {
            return null;
        }
    }


    async getAllEnabledApprenticeships() {
        try {
            return await Apprenticeship.findAll({attributes: ['id','user','cohort', 'class', 'phase'], where : {status: "ENABLED"}});
        } catch (err) {
            return null;
        }
    }

    async deleteApprenticeship(apprenticeshipId) {
        try {
            const apprenticeshipToDelete = await Apprenticeship.findByPk(apprenticeshipId);
            console.log("Apprenticeship to delete: " + apprenticeshipToDelete);
            apprenticeshipToDelete.update({ status: "SOFT-DELETED" });
            return apprenticeshipToDelete;
        } catch (err) {
            return null;
        }
    }

    async updateApprenticeship(apprenticeshipId, updateTo) {
        try {
            let apprenticeship = await Apprenticeship.findByPk(apprenticeshipId);

            if (updateTo.status) { apprenticeship.status = updateTo.status };
            if (updateTo.startdate) { apprenticeship.startdate = updateTo.startdate };
            if (updateTo.enddate) {apprenticeship.enddate = updateTo.enddate};
            if (updateTo.exam) {apprenticeship.exam = updateTo.exam};
            if (updateTo.result) {apprenticeship.result = updateTo.result};

            return await apprenticeship.save();
        } catch (err) {
            return null;
        }
    }

    async getClassesRelatedToCohort(cohortName) {
        return await Class.findAll({
            where: {
                cohortName: cohortName
            }
        })
    }

    // Cascading after cohort is set to disabled. Then set change this cohort in classes to null.
    async deleteCohortInClasses(cohortName) {

        Class.findAll({ where: { cohortName: cohortName } }).then((result) => {
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    result[i].cohortName = null
                    result[i].save();
                }
            }
        })
    }
}

const apprenticeshipRepository = new ApprenticeshipRepository();
export { apprenticeshipRepository };
