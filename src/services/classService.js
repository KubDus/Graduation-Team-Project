import { classRepository } from "../repositories/classRepository";
import utils from "../utils/utils";
import { dashboardRepository } from "../repositories/dashboardRepository";

class ClassService {

    async createClass(classToCreate) {

        if (!classToCreate.name) {
            return utils.errorResponse(400, "Provide at least a class name.")
        }

        // check if class already exists
        if (await classRepository.getClassByName(classToCreate.name)) {
            return utils.errorResponse(409, "Class name already used.")
        }

        // create class
        await classRepository.createClass(classToCreate);
        return utils.messageResponse(200, "Class created.");
    }


    async getAllActiveClasses() {
        const classesToReturn = await classRepository.getAllActiveClasses();

        if (classesToReturn) {
            return utils.jsonResponse(200, classesToReturn);
        }
        return utils.errorResponse(404, "Some error occurred.");
    }

    async deleteClassById(classId) {
        const possibleClass = await classRepository.getClassById(classId);

        if (!possibleClass) {
            return utils.errorResponse(404, "Such a class does not exist.")
        }

        if (possibleClass && possibleClass.status === "SOFT-DELETED") {
            return utils.messageResponse(200, "Class was already deleted.")
        }
        await dashboardRepository.deleteClassesInApprenticeship(classId);
        return await classRepository.deleteClass(classId);
    }

    async updateClassById(classId, updateTo) {

        if (!await classRepository.getClassById(classId)) {
            return utils.errorResponse(404, "Such a class does not exist.")
        }

        if (await classRepository.getClassByName(updateTo.name)) {
            const classWithTheNameToUpdateTo = await classRepository.getClassByName(updateTo.name);

            // If the class name already exists and it is the name of a current class to be updated.
            if (classWithTheNameToUpdateTo.id != classId) {
                return utils.errorResponse(409, "Such a class name already exists.")
            }
        }

        return await classRepository.updateClass(classId, updateTo);
    }

    async getClassInfoById(id) {
        const classToFind = await classRepository.getClassById(id);
        const studentsInClass = await dashboardRepository.getApprenticesByClass(id);

        var jsonToReturn = JSON.parse(JSON.stringify(classToFind));
        jsonToReturn.students = studentsInClass;

        if (classToFind) {
            return utils.jsonResponse(200, jsonToReturn);
        }
        return utils.errorResponse(404, "Class not found");
    }

}

const classService = new ClassService();
export { classService };