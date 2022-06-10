const axios = require("axios");
const { getApiTypes } = require("../services/pokemonServices.js");
const { Type } = require("../db.js");

async function getPokemonTypes(req, res, next) {
    try {
        const allTypes = await Type.findAll();
        res.send(allTypes);
    } catch (error) {
        next(error)
    }
};

module.exports = { getPokemonTypes };