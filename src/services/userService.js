const { generateJwt } = require("../utils/jwt");
const { NotFoundError, ValidationError } = require('../errors/ApiError');
const bcrypt = require('bcrypt');
const MESSAGES = require("../constants/messages");

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    };

    async create(userData) {
        const hashPassword = await bcrypt.hash(userData.password, 5);

        const candidate = await this.User.findOne({
            where: {
                phonenumber: userData.phonenumber
            }
        });

        if (candidate) {
            throw new ValidationError(MESSAGES.VALIDATION.USER_EXISTS);
        };

        const user = await this.User.create({
            phonenumber: userData.phonenumber,
            password: hashPassword
        });

        const token = generateJwt(user.id, user.phonenumber);

        return token;
    };

    async login(userData) {
        const user = await this.User.findOne({
            where: {
                phonenumber: userData.phonenumber
            }
        });

        if (user == null) {
            throw new NotFoundError(MESSAGES.VALIDATION.USER_NOT_FOUND);
        };

        let comparedPassword = bcrypt.compareSync(userData.password, user.password);

        if (!comparedPassword) {
            throw new ValidationError(MESSAGES.VALIDATION.WRONG_PASSWORD);
        };

        const token = generateJwt(user.id, user.phonenumber);

        return token;
    };
};

module.exports = UserService;