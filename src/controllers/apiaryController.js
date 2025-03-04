const { ValidationError } = require("../errors/ApiError");
const MESSAGES = require("../constants/messages");

class ApiaryController {

    constructor(apiaryService) {
        this.apiaryService = apiaryService;
    };

    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const apiaryData = req.body;

            if (userId === null) {
                throw new ValidationError(MESSAGES.VALIDATION.USER_NOT_FOUND);
            };

            if (apiaryData.name === '') {
                throw new ValidationError(MESSAGES.VALIDATION.EMPTY_FIELDS);
            };

            const created = await this.apiaryService.create(userId, apiaryData);
            return res.status(201).json(created);
        } catch (error) {
            next(error);
        };
    };

    async getApiaries(req, res, next) {
        try {
            const userId = req.user.id;

            if (userId === null) {
                throw new ValidationError(MESSAGES.VALIDATION.USER_NOT_FOUND);
            };

            const apiarys = await this.apiaryService.getApiaries(userId);
            return res.status(200).json(apiarys);
        } catch (error) {
            next(error);
        };
    };

    async getApiaryDetails(req, res, next) {
        try {
            const { apiaryId } = req.params;

            if (apiaryId === undefined || apiaryId === null) {
                throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
            };

            const apiary = await this.apiaryService.getApiaryDetails(apiaryId);
            return res.status(200).json(apiary);
        } catch (error) {
            next(error);
        };
    };
};

module.exports = ApiaryController;