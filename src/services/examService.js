import Exam from "../models/exam";
import { examRepository } from "../repositories/examRepository";
import utils from "../utils/utils";

class ExamService {
    async create(examToCreate){
        if (!examToCreate.phase || !examToCreate.isRetake || await utils.isValidDate(examToCreate.date)) {
            return utils.errorResponse(400,"Please provide all the necessary inputs for creating an exam!")
        } else {
            await examRepository.create(examToCreate);
            return utils.messageResponse(201,"Exam created.")
        };
    };

    async readAll(){
        return {
            body: await examRepository.getAllExams(),
            status: 200
            }
    };

    async readByPk(id){
        if (id > await Exam.count() || id < 0 || isNaN(id)) {
            return utils.errorResponse(404,"Invalid id!")
        } else {
            return utils.messageResponse(200,await examRepository.getExamByPk(id));  
        }
    };
    
    async update(id,values){
        if (id > await Exam.count() || id < 0 || isNaN(id)) {
            return utils.errorResponse(404,"Invalid id!");
        } else {
            return utils.messageResponse(200, await examRepository.update(id,values));
        };
    };
    
    async delete(id){
        if (id > await Exam.count() || id < 0 || isNaN(id)) {
            return utils.errorResponse(404,"Invalid id!");
        } else {
            return utils.messageResponse(200, await examRepository.delete(id));
        };
    };
};
const examService = new ExamService();
export { examService };