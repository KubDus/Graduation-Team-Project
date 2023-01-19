import { dashboardService } from "../services/dashboardService";

class DashboardController {

    async getDashboardInfo(req, res) {
        var response = await dashboardService.getRecordInfo(req.tokenDecoded);
        res.status(response.status).send(response.body);
    }
}

const dashboardController = new DashboardController();
export { dashboardController };