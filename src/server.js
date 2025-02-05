const express = require('express');
const sequelize = require('./db/db');
const model = require('./models/models');
const cors = require('cors');
require('dotenv').config();

const { connectMQTT } = require('./services/mqqt/mqttService');

const UserService = require('./services/userService');
const UserController = require('./controllers/userController');
const ApiaryService = require('./services/apiaryService');
const ApiaryController = require('./controllers/apiaryController');
const BeehiveService = require('./services/beehiveService');
const BeehiveController = require('./controllers/beehiveController');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

const userService = new UserService(model.User);
const apiaryService = new ApiaryService(model.Apiary, model.Beehive, model.SensorData);
const beehiveService = new BeehiveService(model.Apiary, model.Beehive, model.SensorData);

const userController = new UserController(userService);
const apiaryController = new ApiaryController(apiaryService);
const beehiveController = new BeehiveController(beehiveService);

const router = require('./routers/index')(userController, apiaryController, beehiveController, authMiddleware);

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/api', router);

connectMQTT(beehiveController);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => {
            console.log('Server running');
        });
    } catch (error) {
        console.log(error);
    }
};

start();