"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        title: "Utah Kitties!",
        description: "Come play with kitties as you look over the mountains!",
        hostId: 1,
        address: "12345 N 7th St",
        city: "Vernal",
        state: "UT",
        zipCode: "98765",
        hrPrice: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Beach Baby",
        description: "You will love being near the water at this cat cafe!",
        hostId: 1,
        address: "9384 N 7th St",
        city: "West Covina",
        state: "CA",
        zipCode: "43434",
        hrPrice: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options);
  },
};
