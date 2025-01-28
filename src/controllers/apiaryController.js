const apiaryService = require("../services/apiaryService");

class ApiaryController {
    async create(req, res) {
        try {
            const userId = req.user.id;
            const apiaryData = req.body;
            const created = await apiaryService.create(userId, apiaryData);
            return res.status(201).json(created);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getApirays(req, res) {
        try {
            const userId = req.user.id;
            const apiarys = await apiaryService.getApiarys(userId);
            return res.status(200).json(apiarys);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getApiaryDetails(req, res) {
        try {
            // const { apiaryId } = req.body;
            const { apiaryId } = req.params;
            const apiary = await apiaryService.getApiaryDetails(apiaryId);
            // const apiary = await apiaryService.getApiaryBeehives(apiaryId);
            return res.status(200).json(apiary);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ApiaryController();