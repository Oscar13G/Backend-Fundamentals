const {Sequelize, DataTypes, REAL} = require('sequelize');
const sequelize = require("../config/db");
const God = require('./gods');

const Realm = sequelize.define('Realm',{
    name:{
        type:DataTypes.CHAR(64)
    },
    description:{
        type:DataTypes.TEXT
    }
});

// Realm.hasMany(God,  {
//     foreignKey: {
//       allowNull: false
//     }
//   });
Realm.hasMany(God);
God.belongsTo(Realm);

module.exports = Realm;