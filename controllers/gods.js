const God = require("../models/gods");

function createGod(req, res) {
  let body = req.body;
  //   console.log(body);

  God.create(body).then((god) => {
    res.status(201).json(god);
  }).catch((error) =>{
    res.status(404).json({'error':'Error de datos'});
  });
}

async function getGod(req, res) {
  let id = req.params.id;
  const god = await God.findByPk(id);
  res.status(200).json(god);
}

async function getGods(req, res) {
  const gods = await God.findAll();
  res.status(200).json(gods);
}

async function updateGod(req, res) {
  let id = req.params.id;
  let god = req.body;

  await God.update(god, { where: { id } });
  const update_God = await God.findByPk(id);
  res.status(200).json(update_God);
}

async function deleteGod(req, res) {
  let id = req.params.id;
  let delete_God = God.destroy({ where: { id } });
  res.status(200).json(delete_God);
}

module.exports = {
  createGod,
  getGod,
  getGods,
  updateGod,
  deleteGod,
};
