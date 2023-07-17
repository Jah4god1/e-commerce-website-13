const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}

Tag.init(
{
// Define the model attributes (columns)
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
},
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'tag',
}
);

module.exports = Tag;