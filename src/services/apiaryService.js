const { Sequelize } = require("../db/db");
const { ValidationError } = require("../errors/ApiError");
const MESSAGES = require("../constants/messages");

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

    async getApiaries(userId) {

        const apiaries = await this.Apiary.findAll(
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

        const beehivesWeight = await this.Beehive.findAll({
            where: {
                apiaryId: apiaries.map(apiary => apiary.id),
            },
            attributes: ['id', 'apiaryId', 'beehive_key'],
            include: [
                {
                    model: this.SensorData,
                    as: 'sensors_data',
                    attributes: ['id', 'weight'],
                    limit: 2,
                    order: [['createdAt', 'DESC']]
                }
            ]
        });

        return apiaries;
    };

    async getApiaryDetails(apiaryId) {

        if (apiaryId === null) {
            throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
        };

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

        if (apiaryId === null) {
            throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
        };

        const beehives = await this.Beehive.findAll({
            where: {
                apiaryId: apiaryId
            }
        });
        return beehives;
    };
}

module.exports = ApiaryService;