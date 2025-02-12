const bcrypt = require('bcrypt');
const { generateJwt } = require("../utils/jwt");

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
            throw new Error('User already exists');
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
            throw new Error("User not found");
        };

        let comparedPassword = bcrypt.compareSync(userData.password, user.password);

        if (!comparedPassword) {
            throw new Error("Worng password");
        }

        const token = generateJwt(user.id, user.phonenumber);

        return token;
    }
}

module.exports = UserService;