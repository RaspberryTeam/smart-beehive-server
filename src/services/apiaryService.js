const { Sequelize } = require("../db/db");

class ApiaryService {

    constructor(ApiaryModel, BeehiveModel, SensorDataModel) {
        this.Apiary = ApiaryModel;
        this.Beehive = BeehiveModel;
        this.SensorData = SensorDataModel;
    }

    async create(userId, apiaryData) {
        const created = await this.Apiary.create({
            userId: userId,
            name: apiaryData.name
        });

        return created;
    };

    async getApiarys(userId) {
        const apiarys = await this.Apiary.findAll(
            {
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: this.Beehive,
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
        const apiray = await this.Apiary.findOne({
            where: {
                id: apiaryId
            },
            include: [
                {
                    model: this.Beehive,
                    as: 'beehives',
                    include: [
                        {
                            model: this.SensorData,
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
        const beehives = await this.Beehive.findAll({
            where: {
                apiaryId: apiaryId
            }
        })
        return beehives;
    };
}

module.exports = ApiaryService;