"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: "hostId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId", onDelete: 'CASCADE', hooks: true });
      Spot.hasMany(models.Photo, { foreignKey: "spotId", onDelete: 'CASCADE', hooks: true });
      Spot.hasMany(models.Review, { foreignKey: "spotId", onDelete: 'CASCADE', hooks: true });
    }
  }
  Spot.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      hostId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      zipCode: DataTypes.INTEGER,
      hrPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
