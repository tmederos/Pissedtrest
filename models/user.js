module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      google_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: DataTypes.STRING
    }, {
        timestamps: false
    });
    User.associate = function(models) {
      // Associating User with Pins
      // When an User is deleted, also delete any associated Boards
      User.hasMany(models.Board, {
        onDelete: "cascade"
      });
    };
    return User;
  };

