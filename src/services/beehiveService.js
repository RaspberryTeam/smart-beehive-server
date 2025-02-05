class BeehiveService {

    constructor(ApiaryModel, BeehiveModel, SensorDataModel) {
        this.Apiary = ApiaryModel;
        this.Beehive = BeehiveModel;
        this.SensorData = SensorDataModel;
    }

    async create(beehiveData) {

        const apiary = await this.Apiary.findOne({ where: beehiveData.apiaryId });

        if (!apiary) {
            return res.status(400).json({ message: 'Apiary not found' });
        };

        const created = await this.Beehive.create({
            beehive_key: beehiveData.beehive_key,
            apiaryId: beehiveData.apiaryId,
            name: beehiveData.name,
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
    }

    async addSensorsData(data) {

        // TODO: after created write event for send push notification to mobile app
        data.toString();
        data += '"}';
        const beehiveData = JSON.parse(data);

        const existingBeehive = await this.Beehive.findOne({
            where: { beehive_key: beehiveData.beehive_key }
        });

        if (!existingBeehive) {
            throw new Error(`Beehive with code ${beehiveData.beehive_key} not found.`);
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

        if (!beehive) {
            throw new Error("Not found");
        }

        return beehive;
    };
}

module.exports = BeehiveService;