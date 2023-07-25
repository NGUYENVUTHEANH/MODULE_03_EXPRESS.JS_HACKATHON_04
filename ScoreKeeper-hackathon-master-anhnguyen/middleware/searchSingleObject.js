const express = require('express')
const app = express.Router()
const Game = require('../models/game')

async function getGame(req, res, next) {
    try {
        game = await Game.findById(req.params.id).populate('_class')
        if (game == null) {
            return res.status(404).json({ message: 'Cant find game'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
  
    res.game = game
    next()
}

module.exports = SearchUtils;