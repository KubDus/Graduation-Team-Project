import Exam from "../models/exam";
import utils from "../utils/utils";

class ExamRepository{
    async create(examToCreate){
        return Exam.create(examToCreate);
    }

    async getAllExams(){
        try {
           return await Exam.findAll(); 
        } catch (error) {
            return "Something went wrong!";
        }    
    }

    async getExamByPk(id){
        try {
            return await Exam.findByPk(id);  
        } catch (error) {
            return "Something went wrong!";
        }
    }

    async update(id,values){
        try {
            const examToUpdate = await Exam.findByPk(id)
            console.log(values);
            if (values.phase) {examToUpdate.phase = values.phase}
            if (values.isRetake) {examToUpdate.isRetake = values.isRetake}
            if (values.date && utils.isValidDate(values.date)) {examToUpdate.date = values.date}
            if (values.name) {examToUpdate.name = values.name}
            if (values.description) {examToUpdate.description = values.description}
            if (values.solution) {examToUpdate.solution = values.solution}
            if (values.walkthrough) {examToUpdate.walkthrough = values.walkthrough}
            await examToUpdate.save();
            return "Updated."
        } catch (error) {
            return "Something went wrong!";
        }
    }

    async delete(id){
        try {
            const examToDelete = await Exam.findByPk(id);
            examToDelete.status = "SOFT-DELETED"
            examToDelete.save();
        return "Deleted";
        } catch (error) {
            return "Something went wrong!";           
        }
    }
}
const examRepository = new ExamRepository();
export { examRepository };