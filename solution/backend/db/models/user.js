"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, email, firstName, lastName, bio } = this; // context will be the User instance
      return { id, email, firstName, lastName, bio };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          email: credential,
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        bio,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, { foreignKey: "hostId" });
      User.hasMany(models.Booking, { foreignKey: "userId" });
      User.hasMany(models.Review, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      // username: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     len: [4, 30],
      //     isNotEmail(value) {
      //       if (Validator.isEmail(value)) {
      //         throw new Error("Cannot be an email.");
      //       }
      //     },
      //   },
      // },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      bio: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
