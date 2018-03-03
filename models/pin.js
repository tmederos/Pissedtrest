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
   description: DataTypes.STRING,
   uploaded_by: DataTypes.STRING,
   category: DataTypes.STRING,
   filepath: DataTypes.STRING
}, {
   timestamps: false
});
 return Pin;
};
