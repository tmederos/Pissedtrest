module.exports = function(sequelize, DataTypes) {
    var Board = sequelize.define("Board", {
      id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
   user_id: DataTypes.STRING,
   pin_id: DataTypes.INTEGER,
    }, {
        timestamps: false
    });
    return Board;
  };