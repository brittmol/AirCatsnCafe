"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          spotId: 1,
          userId: 1,
          comment: "I love Utah!!! would visit again!",
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 2,
          comment: "Ewww Utah sucks, don't go there",
          rating: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 3,
          comment: "It was whatever, I've been to better",
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 3,
          comment: "Beach is cool",
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 2,
          comment: "I love florida, the best",
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 1,
          comment:
            "Too crowded, if you wanna have a terrible spring break and get covid, come here",
          rating: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
