const { DataTypes } = require("sequelize");
const userDB = require("../config/userDB");
const User = require("./userModel");

const Friend = userDB.define("friend", {
  serial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  friendName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "friend_name"
  }
});

Friend.belongsTo(User);

module.exports = Friend;
