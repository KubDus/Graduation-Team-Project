import { examService } from "../services/examService";

class ExamController {

    async create(req,res){
        if (req.isUserLoggedAdmin) {
            const response = await examService.create(req.body);
            return res.status(response.status).send(response.body);  
        } else {
            return res.status(403).send("Access denied!")
        };
    };

    async readAll(req,res){    
        if (req.isUserLoggedAdmin) {
            const response = await examService.readAll(req.tokenDecoded);
            return res.status(response.status).send(response.body); 
        } else {
            return res.status(403).send("Access denied!")
        };
    };

    async readByPk(req,res){
        if (req.isUserLoggedAdmin) {
            const response = await examService.readByPk(req.params.id);
            return res.status(response.status).send(response.body); 
        } else {
            return res.status(403).send("Access denied!")
        }; 
    };

    async update(req,res){
        if (req.isUserLoggedAdmin) {
            const response = await examService.update(req.params.id,req.body);
            return res.status(response.status).send(response.body);
        } else {
            return res.status(403).send("Access denied!")
        }
    }

    async delete(req,res){ 
        if (req.isUserLoggedAdmin) {
            const response = await examService.delete(req.params.id);
            return res.status(response.status).send(response.body); 
        } else {
            return res.status(403).send("Access denied!")
        };
    };
};
const examController = new ExamController();
export { examController };