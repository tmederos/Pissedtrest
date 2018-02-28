const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Pin = sequelize.define( "Pin", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: Sequelize.STRING,
    image_id: Sequelize.STRING,
    category: Sequelize.STRING
}, {
    timestamps: false
});
  return Pin;
};
