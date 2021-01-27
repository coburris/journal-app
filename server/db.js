const Sequelize = require('sequelize');
const sequelize = new Sequelize('WorkoutLog', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
.then(() => {
        console.log('Connected to workoutLog postgres database');
    })
    .catch((err) => {
        console.log("Unable to connect to the database:", err);
    });
module.exports = sequelize;