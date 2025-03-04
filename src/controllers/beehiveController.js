const { ValidationError, NotFoundError } = require("../errors/ApiError");

const MESSAGES = require("../constants/messages");

class BeehiveController {

    constructor(beehiveService) {
        this.beehiveService = beehiveService;
    };

    async addBeehive(req, res, next) {
        try {
            const beehiveData = req.body;
            const created = await this.beehiveService.create(beehiveData);
            return res.status(201).json(created);
        } catch (error) {
            next(error);
        };
    };

    async addSensorsData(sensorsData) {
        try {
            if (!sensorsData) {
                throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
            };
            const created = await this.beehiveService.addSensorsData(sensorsData);

        } catch (error) {
            console.log(error.message);
        };
    };

    async getBeehiveById(req, res) {
        try {
            const { beehiveId } = req.params;

            if (beehiveId === undefined || beehiveId === null) {
                throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
            };

            const beehive = await this.beehiveService.getBeehiveById(beehiveId);

            if (!beehive) {
                throw new NotFoundError(MESSAGES.ERRORS.NOT_FOUND);
            };

            return res.status(200).json(beehive);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        };
    };
}

module.exports = BeehiveController;