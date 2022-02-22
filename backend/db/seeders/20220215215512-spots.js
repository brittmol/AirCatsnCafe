"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Spots",
      [
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
