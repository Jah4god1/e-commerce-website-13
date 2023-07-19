require("dotenv").config();

const { Sequelize } = require("sequelize");



const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      database_name:'ecommerce_db',
      database_username:'root',
      database_password:'',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
