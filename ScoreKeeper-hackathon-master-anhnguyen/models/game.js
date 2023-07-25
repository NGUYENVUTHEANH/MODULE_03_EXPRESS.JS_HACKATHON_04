const mongoose = require('mongoose');

let Schema = mongoose.Schema

let gameSchema = new Schema({
    playerName: {
        type: [String],
        required: true,
    },
    round: [{
        type: Array,
        default: null,
    }],
    result: [{
        type: Number,
        default: null
    }]
})

function checkNumberOfPlayers(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Game', gameSchema);
