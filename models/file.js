module.exports = function(sequelize, DataTypes) {
  var FileData = sequelize.define("FileData", {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }

  });
  return FileData;
};
