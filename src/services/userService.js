const { default: axios } = require("axios");
const { User } = require("../models/models");
const bcrypt = require('bcrypt');
const { generateJwt } = require("../utils/jwt");

class UserService {
    async create(userData) {
        const hashPassword = await bcrypt.hash(userData.password, 5);

        const candidate = await User.findOne({
            where: {
                phonenumber: userData.phonenumber
            }
        })

        if (candidate) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            phonenumber: userData.phonenumber,
            password: hashPassword
        });

        const token = generateJwt(user.id, user.phonenumber);

        return token;
    };

    async login(userData) {

        const user = await User.findOne({
            where: {
                phonenumber: userData.phonenumber
            }
        });
        console.log(user);

        if (user == null) {
            throw new Error("User not found");
        };

        let comparedPassword = bcrypt.compareSync(userData.password, user.password);

        console.log(comparedPassword);

        if (!comparedPassword) {
            throw new Error("Worng password");
        }

        const token = generateJwt(user.id, user.phonenumber);
        console.log(token);

        return token;
    }
}

module.exports = new UserService();