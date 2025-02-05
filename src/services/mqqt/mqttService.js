const mqtt = require('mqtt');

let client;

function connectMQTT(beehiveController) {
    client = mqtt.connect(process.env.MQTT_BROKER_URL, {
        username: process.env.MQTT_USERMANE,
        password: process.env.MQTT_PASSWORD,
        clientId: process.env.MQTT_CLIENT_ID,
    });

    client.on('connect', () => {
        subscribeToTopic(process.env.MQTT_TOPIC);
    });

    client.on('message', (topic, message) => {
        beehiveController.addSensorsData(message);
    });
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
};