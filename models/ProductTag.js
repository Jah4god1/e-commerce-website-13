const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
{
// Define the model attributes (columns)
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
},
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'product_tag',
}
);

module.exports = ProductTag;
