"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          title: "Utah Place!",
          description: "Great place near the mountains. Near the reservation!",
          hostId: 1,
          address: "12345 N 7th St",
          city: "Vernal",
          state: "UT",
          zipCode: "98765",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Beach Baby",
          description: "You will love being near the water!",
          hostId: 1,
          address: "9384 N 7th St",
          city: "West Covina",
          state: "CA",
          zipCode: "43434",
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
