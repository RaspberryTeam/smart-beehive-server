const { Beehive, SensorData, Apiary } = require("../models/models");
const { default: axios } = require("axios");

class BeehiveService {
    async create(beehiveData) {

        const apiary = await Apiary.findOne({ where: beehiveData.apiaryId });

        if (!apiary) {
            return res.status(400).json({ message: 'Apiary not found' });
        }

        const created = await Beehive.create({
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

        data.toString()
        data += '"}';
        const beehiveData = JSON.parse(data);

        const existingBeehive = await Beehive.findOne({
            where: { beehive_key: beehiveData.beehive_key }
        });

        if (!existingBeehive) {
            throw new Error(`Beehive with code ${beehiveData.beehive_key} not found.`);
        }

        const beehiveId = existingBeehive.id;

        const created = await SensorData.create({
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
    };

    async getBeehiveById(beehiveId) {
        const beehive = await Beehive.findOne({
            where: {
                id: beehiveId
            },
            include: {
                model: SensorData,
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

    async beardCheck(req, res) {
        try {
            const raspberryPiId = '10.245.99.54';
            const port = 5000;
            const endpoint = `http://${raspberryPiId}:${port}/`;

            // TODO: create endpoint wich send all beehives request and beard check
            const response = await axios.get(endpoint);

            if (response) {
                return res.status(200).json({ data: response.data });
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new BeehiveService();