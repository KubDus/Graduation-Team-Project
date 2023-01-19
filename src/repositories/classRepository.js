import Class from "../models/class";
import utils from "../utils/utils";

class ClassRepository {

    createClass(classToCreate) {
        return Class.create(classToCreate);
    }

    async getClassById(id) {
        try {
            return await Class.findByPk(id);
        } catch (err) {
            return null;
        }
    }

    async getClassByName(name) {
        try {
            return await Class.findOne({ where: { name: name } });
        } catch (err) {
            return null;
        }
    }

    async getAllActiveClasses() {
        try {
            return await Class.findAll({attributes: ['id','name','cohortName', 'classTypeId'], where : {status: "ENABLED"}});
        } catch (err) {
            return null;
        }
    }

    async deleteClass(classId) {
        try {
            const classToDelete = await Class.findByPk(classId);
            classToDelete.update({ status: "SOFT-DELETED" })
            return utils.messageResponse(200, "Class deleted.")
        } catch (err) {
            return utils.errorResponse(404, "Such a class does not exist.")
        }
    }

    async updateClass(classId, updateTo) {
        try {
            let classToUpdate = await Class.findByPk(classId);

            if (updateTo.name) { classToUpdate.name = updateTo.name };
            if (updateTo.cohortName) { classToUpdate.cohortName = updateTo.cohortName };
            if (updateTo.classTypeId) {classToUpdate.classTypeId = updateTo.classTypeId};
            if (updateTo.scheduleId) {classToUpdate.scheduleId = updateTo.scheduleId};
            if (updateTo.status) {classToUpdate.status = updateTo.status};

            await classToUpdate.save();

            return utils.messageResponse(200, "Updated.")
        } catch (err) {
            return utils.errorResponse(404, "Some problem occurred.")
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
    async 
    deleteCohortInClasses(cohortName) {

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

const classRepository = new ClassRepository();
export { classRepository };
