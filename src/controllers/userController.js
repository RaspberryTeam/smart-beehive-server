const userService = require("../services/userService");

class userController {
    async register(req, res) {
        try {
            const userData = req.body;
            const token = await userService.create(userData);
            return res.status(201).json(token);
        } catch (error) {
            return res.status(400);
        }
    }

    async login(req, res) {
        try {
            const userData = req.body;
            const token = await userService.login(userData);
            return res.status(200).json(token);
        } catch (error) {
            return res.status(400);
        }
    }
}

module.exports = new userController();