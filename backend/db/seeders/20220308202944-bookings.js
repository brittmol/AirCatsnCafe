"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 1,
          startTime: new Date("April 17, 2022 10:00:00"),
          endTime: new Date("April 17, 2022 11:00:00"),
          hours: 1,
          numGuests: 3,
          price: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 1,
          startTime: new Date("May 2, 2022 15:00:00"),
          endTime: new Date("May 2, 2022 17:00:00"),
          hours: 2,
          numGuests: 2,
          price: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
