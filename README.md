# smart-beehive-server
Smart Beehive - is a hive monitoring system that uses Raspberry Pico to collect data from sensors and transmit it to a server.

## Technologies
- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Broker: MQTT
- JWT
- dotenv
- CORS

## Install
### 1. Clone repository
```
git clone https://github.com/RaspberryTeam/smart-beehive-server.git
cd smart-beehive-server
```

### 2. Install dependencies
```
npm install
```

### 3. Setting environment variable
```
PORT=3000

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432

JWT_SECRET=your_jwt_secret

MQTT_BROKER_URL=mqtt://your_mqtt_broker
MQTT_TOPIC=your_mqtt_topic
```

### 4. Project launch
```
npm start
```

## API Endpoints
### Users
- `POST /api/users` - user registration
- `POST /api/users/login` - user authentication

### Apiaries
- `POST /api/apiaries` - create new apiary
- `GET /api/apiaries` - get a list of apiaries
- `GET /api/apiaries/:id` - get details of apiary

### Beehives
- `POST /api/beehives` - create new beehive
- `GET /api/beehives/:id` - get details of beehive
