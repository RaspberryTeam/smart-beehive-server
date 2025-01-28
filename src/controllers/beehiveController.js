const beehiveService = require("../services/beehiveService");

class BeehiveController {
    async addBeehive(req, res) {
        try {
            const beehiveData = req.body;
            console.log(beehiveData);
            const created = await beehiveService.create(beehiveData);
            return res.status(201).json(created);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    async addSensorsData(data) {
        try {
            const created = await beehiveService.addSensorsData(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    async getBeehiveById(req, res) {
        try {
            const { beehiveId } = req.params;
            const beehive = await beehiveService.getBeehiveById(beehiveId);
            return res.status(200).json(beehive);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new BeehiveController();