import { dashboardRepository } from "../repositories/dashboardRepository";
import utils from "../utils/utils";

class DashboardService {

    async getRecordInfo(user) {
        const records = await dashboardRepository.getRecords(user);
        return utils.messageResponse(200,records);
    }
}

const dashboardService = new DashboardService();
export { dashboardService };