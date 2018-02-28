// //reference connection to DB
// const sequelize = require("../config/connection.js");
const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
      email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    }, {
        timestamps: false
    });
    User.associate = function(models) {
      // Associating User with Pins
      // When an User is deleted, also delete any associated Pins
      User.hasMany(models.Pin, {
        onDelete: "cascade"
      });
    };
    return User;
  };

