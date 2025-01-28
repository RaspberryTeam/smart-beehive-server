const mqtt = require('mqtt');
const beehiveController = require('../controllers/beehiveController');

let client;

function connectMQTT() {
    client = mqtt.connect(process.env.MQTT_BROKER_URL, {
        username: 'NodeSide',
        password: 'Raspberryteam2004!',
        clientId: 'Node',
    });

    client.on('connect', () => {
        subscribeToTopic(process.env.MQTT_TOPIC);
    });

    client.on('message', (topic, message) => {
        beehiveController.addSensorsData(message);
    })
};

function subscribeToTopic(topic) {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error(' Error to subcsribe topic:', err);
        } else {
            console.log(` Subscribe to topic: ${topic}`);
        }
    })
};

module.exports = {
    connectMQTT
}