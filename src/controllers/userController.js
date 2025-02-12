class UserController {

    constructor(userService) {
        this.userService = userService;
    };

    async register(req, res) {
        try {
            const userData = req.body;
            const token = await this.userService.create(userData);
            return res.status(201).json(token);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async login(req, res) {
        try {
            const userData = req.body;
            const token = await this.userService.login(userData);
            return res.status(200).json(token);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
};

module.exports = UserController;