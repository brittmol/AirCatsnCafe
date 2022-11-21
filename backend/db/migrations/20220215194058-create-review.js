"use strict";
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Spots" },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews", options);
  },
};
