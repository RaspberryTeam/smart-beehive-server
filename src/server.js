const express = require('express');
const sequelize = require('./db/db');
const model = require('./models/models');
const router = require('./routers/index');
const cors = require('cors');
const { connectMQTT } = require('./services/mqttService');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/api', router);

connectMQTT();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => {
            console.log('Server running');
        })
    } catch (error) {
        console.log(error);
    }
};

start();