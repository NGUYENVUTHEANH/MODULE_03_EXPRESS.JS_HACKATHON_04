const express = require('express')
const app = express.Router()
const Game = require('../models/game')


async function getGame(req, res, next) {
    try {
        game = await Game.findById(req.params.id)
        if (game == null) {
            return res.status(404).json({ message: 'Cant find game' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.game = game
    next()
}

app.post('/game', (req, res) => {
    const newGame = new Game(req.body);
    newGame.save((err, data) => {
        if (err) {
            res.json({
                message: err,
                success: false
            })
        } else {
            res.json({
                message: 'success',
                data: data._id,
                sucesss: true
            })
        }
    })
})

app.get('/game/:id', getGame, (req, res) => {
    res.json(res.game);
})

app.patch('/game/:id/:rowIndex', getGame, async (req, res) => {
    let rowIndex = Number(req.params.rowIndex)
    if (!req.params.id || !req.params.rowIndex) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    if (req.body['round'] != null) {
        res.game['round'][rowIndex][0] = req.body.round[0]
        res.game['round'][rowIndex][1] = req.body.round[1]
        res.game['round'][rowIndex][2] = req.body.round[2]
        res.game['round'][rowIndex][3] = req.body.round[3]
    } else {
        res.status(400).json({ message: err.message })
        return;
    }
    console.log(res.game)
    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

app.patch('/game/:id', getGame, async (req, res) => {
    if (!req.params.id) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    console.log(req.body['round'])
    res.game['round'].push([0, 0, 0, 0])

    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

module.exports = app 
