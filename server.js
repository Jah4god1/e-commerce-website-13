// 
const { Sequelize } = require('sequelize');

// Replace 'database', 'username', and 'password' with your actual MySQL credentials
const sequelize = new Sequelize('ecommerce_db', 'root', '', {
  host: 'localhost', // Replace with your MySQL server host if different
  dialect: 'mysql', // Use 'mysql' or 'mysql2' based on the available Sequelize version
  port: 3306, // Replace with your MySQL server port if different (default is 3306)
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
