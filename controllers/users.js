const { text } = require("express");
const User = require("../models/users");

async function signUp(req, res) {
  let body = req.body;

  if (!validateTarjeta(body["tarjeta"])) {
    return res.status(400).json({
      error: "Error formato tarjeta",
    });
  }

  try {
    let user = await User.create(body);

    let { passwordSalt, passwordHash } = User.createPassword(body["password"]);
    let { tarjetaSalt, tarjetaHash } = User.createTarjeta(
      body["tarjeta"].replaceAll("-", "")
    );
    user.tarjeta_ref = body["tarjeta"].replaceAll("-", "").substring(12);
    user.password_hash = passwordHash;
    user.password_salt = passwordSalt;
    user.tarjeta_hash = tarjetaHash;
    user.tarjeta_salt = tarjetaSalt;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (
      ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
        error.name
      )
    ) {
      // console.log(error);
      return res.status(400).json({
        error: error.errors.map((e) => e.message),
        // 'error': `${error}`
      });
    } else {
      // console.log(error);
      throw error;
      // res.status(400).json({
      //   error: error.errors.map(e => e.message)
      // });
    }
  }
}

async function logIn(req, res) {
  let body = req.body;

  if (!validateTarjeta(body["tarjeta"])) {
    return res.status(400).json({
      error: "Error formato tarjeta",
    });
  }

  let user = await User.findOne({ where: { username: body["username"] } });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!User.validateHash(
    body['tarjeta'].replaceAll('-', ''), user.tarjeta_salt, user.tarjeta_hash
  ))
    return res.status(404).json({ error: "Tarjeta not found" });
  if (
    User.validateHash(body["password"], user.password_salt, user.password_hash)
  )
    return res.status(200).json({ 
      user: user.username,
      email: user.email,
      token: User.generateJWT(user)
    });
  else return res.status(400).json({ mensaje: "Password Incorrecto" });
}

function validateTarjeta(plainText) {
  if (typeof plainText !== "string") {
    return false;
  }
  return plainText.match(/^(\d{4}[-]?){3}\d{4}$/);
}
module.exports = { signUp, logIn };
