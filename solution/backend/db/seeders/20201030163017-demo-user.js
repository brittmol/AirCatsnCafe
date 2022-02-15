"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          firstName: "Demo",
          lastName: "Lition",
          bio: "I am the demo. Try me out!",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: faker.internet.email(),
          firstName: "Fake1",
          lastName: "User1",
          bio: "",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          firstName: "Fake2",
          lastName: "User2",
          bio: "",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
    // return queryInterface.bulkDelete(
    //   "Users",
    //   {
    //     username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
    //   },
    //   {}
    // );
  },
};
