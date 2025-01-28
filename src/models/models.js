const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: { type: DataTypes.INTEGER, allowNull: true, unique: true },
    phonenumber: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Apiary = sequelize.define('apiary', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: { type: DataTypes.STRING, allowNull: false }
});

const Beehive = sequelize.define('beehives', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    beehive_key: { type: DataTypes.STRING, allowNull: false, unique: true },
    apiaryId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: Apiary,
            key: 'id'
        }
    },
    name: { type: DataTypes.STRING, allowNull: false },
});

const SensorData = sequelize.define('sensors_data', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    beehive_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Beehive,
            key: 'id'
        }
    },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    pressure: { type: DataTypes.FLOAT, allowNull: false },
    humidity: { type: DataTypes.FLOAT, allowNull: false },
    co2_level: { type: DataTypes.FLOAT, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    distance: { type: DataTypes.FLOAT, allowNull: false },
    rain_percentage: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.STRING, allowNull: false },
});


User.hasMany(Apiary, { foreignKey: 'userId' });
Apiary.belongsTo(User, { foreignKey: 'userId' });

Apiary.hasMany(Beehive, { foreignKey: 'apiaryId' });
Beehive.belongsTo(Apiary, { foreignKey: 'apiaryId'});

Beehive.hasMany(SensorData, { foreignKey: 'beehive_id' });
SensorData.belongsTo(Beehive, { foreignKey: 'beehive_id' });

module.exports = {
    Beehive,
    User,
    Apiary,
    SensorData
}