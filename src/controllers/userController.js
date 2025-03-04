const { ValidationError } = require("../errors/ApiError");
const MESSAGE = require("../constants/messages");

class UserController {

    constructor(userService) {
        this.userService = userService;
    };

    async register(req, res, next) {
        try {
            const userData = req.body;

            if (!userData.phonenumber || !userData.password) {
                throw new ValidationError(MESSAGE.VALIDATION.PHONENUMBER_PASSWORD_REQUIRED);
            };

            const token = await this.userService.create(userData);
            return res.status(201).json(token);
        } catch (error) {
            next(error);
        };
    };

    async login(req, res, next) {
        try {
            const userData = req.body;
            if (!userData.phonenumber || !userData.password) {
                throw new ValidationError(MESSAGE.VALIDATION.PHONENUMBER_PASSWORD_REQUIRED);
            };
            const token = await this.userService.login(userData);
            return res.status(200).json(token);
        } catch (error) {
            next(error);
        };
    };
};

module.exports = UserController;