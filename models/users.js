const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const User = sequelize.define("User", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isLowercase: true,
      is: /^[a-zA-Z0-9_-]+$/,
    },
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password_salt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tarjeta_ref: { type: DataTypes.STRING(64) },
  tarjeta_hash: { type: DataTypes.TEXT},
  tarjeta_salt: { type: DataTypes.TEXT },
  tipo_tarjeta: { type: DataTypes.STRING(64) },
});

// User.createCrypto = function (plainText) {
//   let salt = crypto.randomBytes(16).toString("hex");
//   let hash = crypto
//     .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
//     .toString("hex");
//   return { salt: salt, hash: hash };
// };

User.createPassword = function (plainText) {
  let salt = createSalt();
  let hash = createHash(plainText, salt);
  return { passwordSalt: salt, passwordHash: hash };
};
User.createTarjeta = function (plainText) {
  let salt = createSalt();
  let hash = createHash(plainText, salt);
  return { tarjetaSalt: salt, tarjetaHash: hash };
};

User.validateHash = function (plainText, salt, hash) {
  let plainTextHash = createHash(plainText, salt);
  return plainTextHash === hash;
};

function createSalt() {
  let salt = crypto.randomBytes(16).toString("hex");
  return salt;
}
function createHash(plainText, salt) {
  let hash = crypto
    .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
    .toString("hex");
  return hash;
}

User.generateJWT = function (user) {
  const today = new Date();
  const exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    user: user.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret);

}

module.exports = User;
