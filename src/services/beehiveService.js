const { NotFoundError, ValidationError, CreationError } = require("../errors/ApiError");
const MESSAGES = require("../constants/messages");

class BeehiveService {

    constructor(ApiaryModel, BeehiveModel, SensorDataModel) {
        this.Apiary = ApiaryModel;
        this.Beehive = BeehiveModel;
        this.SensorData = SensorDataModel;
    };

    async create(beehiveData) {
        try {
            const apiary = await this.Apiary.findOne({ where: beehiveData.apiaryId });

            if (!apiary) {
                throw new NotFoundError(MESSAGES.ERRORS.NOT_FOUND);
            };

            const created = await this.Beehive.create({
                beehive_key: beehiveData.beehive_key,
                apiaryId: beehiveData.apiaryId,
                name: beehiveData.name,
            });

            return created;
        } catch (error) {
            throw new CreationError(MESSAGES.ERRORS.CREATE_ERROR);
        };
    };

    async addSensorsData(data) {

        if (!data) {
            throw new ValidationError(MESSAGES.ERRORS.BAD_REQUEST);
        };

        data.toString();
        data += '"}';
        const beehiveData = JSON.parse(data);

        const existingBeehive = await this.Beehive.findOne({
            where: { beehive_key: beehiveData.beehive_key }
        });

        if (!existingBeehive) {
            throw new NotFoundError(MESSAGES.ERRORS.NOT_FOUND);
        };

        const beehiveId = existingBeehive.id;

        const created = await this.SensorData.create({
            beehive_id: beehiveId,
            temperature: beehiveData.temperature,
            pressure: beehiveData.pressure,
            humidity: beehiveData.humidity,
            co2_level: beehiveData.co2_level,
            weight: beehiveData.weight,
            distance: beehiveData.distance,
            rain_percentage: beehiveData.rain_percentage,
            longitude: beehiveData.longitude,
            latitude: beehiveData.latitude
        });

        return created;
    };

    async getBeehiveById(beehiveId) {
        const beehive = await this.Beehive.findOne({
            where: {
                id: beehiveId
            },
            include: {
                model: this.SensorData,
                as: 'sensors_data',
                order: [['id', 'DESC']],
                limit: 6
            }
        });

        return beehive;
    };
}

module.exports = BeehiveService;