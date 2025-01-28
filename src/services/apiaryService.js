const { Sequelize } = require("../db/db");
const { Apiary, Beehive, SensorData } = require("../models/models");

class ApiaryService {

    async create(userId, apiaryData) {
        const created = await Apiary.create({
            userId: userId,
            name: apiaryData.name
        });

        return created;
    };

    async getApiarys(userId) {
        const apiarys = await Apiary.findAll(
            {
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: Beehive,
                        as: 'beehives',
                        attributes: [],
                    },
                ],
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('beehives.id')), 'beehivesCount'],
                    ]
                },
                group: ['apiary.id'],
            }
        );

        return apiarys;
    };

    async getApiaryDetails(apiaryId) {
        const apiray = await Apiary.findOne({
            where: {
                id: apiaryId
            },
            include: [
                {
                    model: Beehive,
                    as: 'beehives',
                    include: [
                        {
                            model: SensorData,
                            as: 'sensors_data',
                            attributes: ['temperature', 'humidity', 'weight', 'rain_percentage']
                        }
                    ]
                }
            ]
        });

        return apiray;
    };

    async getApiaryBeehives(apiaryId) {
        const beehives = await Beehive.findAll({
            where: {
                apiaryId: apiaryId
            }
        })
        return beehives;
    };

}

module.exports = new ApiaryService();