const Realm = require("../models/realms");

function createRealm(req, res) {
  let body = req.body;
  Realm.create(body).then((realm) => {
    res.status(201).json(realm);
  });
}

async function getRealm(req,res) {
    let id = req.params.id;
    const realm = await Realm.findByPk(id);
    res.status(200).json(realm);
}

async function getRealms(req,res) {
    const realms = await Realm.findAll();
    res.status(200).json(realms);
}

async function updateRealm(req,res) {
    let id = req.params.id;
    let realm = req.body;

    await Realm.update(realm, {where: {id}});
    const update_Realm = await Realm.findByPk(id);
    res.status(200).json(update_Realm); 
}

async function deleteRealm(req,res) {
    let id = req.params.id;
    let delete_Realm = Realm.destroy({where: {id}});
        res.status(200).json(delete_Realm);
}

module.exports = {
    createRealm,
    getRealm,
    getRealms,
    updateRealm,
    deleteRealm
}