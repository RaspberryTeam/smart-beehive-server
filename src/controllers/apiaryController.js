class ApiaryController {

    constructor(apiaryService) {
        this.apiaryService = apiaryService;
    };

    async create(req, res) {
        try {
            const userId = req.user.id;
            const apiaryData = req.body;
            const created = await this.apiaryService.create(userId, apiaryData);
            return res.status(201).json(created);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async getApiaries(req, res) {
        try {
            const userId = req.user.id;
            const apiarys = await this.apiaryService.getApiarys(userId);
            return res.status(200).json(apiarys);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async getApiaryDetails(req, res) {
        try {
            const { apiaryId } = req.params;
            const apiary = await this.apiaryService.getApiaryDetails(apiaryId);
            return res.status(200).json(apiary);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
};

module.exports = ApiaryController;