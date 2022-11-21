"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options);
  },
};
