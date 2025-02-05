const { default: axios } = require('axios');
const cron = require('cron');

const job = new cron.CronJob('*/14 * * * *', () => {
    console.log("Restart server...");
    axios.get(`${process.env.API_URL}/api/health`)
        .then(response => {
            console.log('Запит успішний', response.status);
        })
        .catch(error => {
            console.log('Помилка при запиті', error);
        });
});

module.exports = job;