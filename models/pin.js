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
    uploaded_by: Sequelize.INTEGER,
    category: Sequelize.STRING,
    filepath: Sequelize.STRING
}, {
    timestamps: false
});

  return Pin;
};
