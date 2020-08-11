const { DataTypes } = require("sequelize");
const userDB = require("../config/userDB");
const { hash } = require("../utils/hash");

const User = userDB.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hash(value));
    }
  }
});

module.exports = User;
