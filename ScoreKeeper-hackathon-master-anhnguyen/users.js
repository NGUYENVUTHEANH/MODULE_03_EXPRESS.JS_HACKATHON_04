const express = require('express');
const fs = require('fs');
const json = require('./user.json');

const users = express.Router();

users.get('/users', (req, res) => {
    const query = req.query.username ? req.query.username.toLowerCase() : null;
    if (query) {
        const result = json.filter((user) => {
            return user.username.toLowerCase().includes(query);
        })
        if (result && result.length > 0) {
            res.json({ data: result, message: 'success', success: true })
        } else {
            res.json({ data: [], message: 'not exist', success: true })
        }
    } else {
        res.json({ data: json, message: 'success', success: true })
    }
})

users.put('/users/:userId', (req, res) => {
    const data = req.params;
    const update = req.body;
    if (!data.userId) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    console.log(data.userId);
    const userIndex = json.findIndex(user => user.id.toString() === data.userId);
    const arr = json.map((user, index) => {
        if (index === userIndex) {
            console.log(update);
            return Object.assign(user, update);
        }
        return user;
    })

    fs.writeFile('./user.json', JSON.stringify(arr), (err, data) => {
        if (err) {
            res.json({ message: err, success: false })
        }
        res.json({ message: 'File has been written', success: true })
    });
})

users.delete('/delete/:userId', (req, res) => {
    const data = req.params;
    const update = req.body;
    let arr = new Array();

    const result = json.find((user) => {
        if (user.id != data.userId) {
            arr.push(user);
        }
    })
    fs.writeFile('./user.json', JSON.stringify(arr), (err, data) => {
        if (err) {
            res.json({ message: err, success: false })
        } else {
            res.json({ data: data, message: 'File has been written', success: true })
        }
    });
})

users.post('/create', (req, res) => {
    if (!req.body.username) {
        res.json({message: 'Username not found', success: false})
        return;
    }
    if (!req.body.password) {
        res.json({message: 'Password not found', success: false})
        return;
    }
    const biggestIndex = json.map(user => user.id);
    const newId = Math.max(...biggestIndex);
    const data = {
        id: newId + 1,
        username: req.body.username,
        password: req.body.password
    }
    json.push(data)
    console.log(json)
    // check data json format
    // get array of object in .json file
    // append data to array
    // write array to json file

    fs.writeFile('./user.json', JSON.stringify(json), (err, data) => {
        if (err) {
            res.json({ message: err, success: false })
        } else {
            res.json({ data: data, message: 'User has been added', success: true })
        }
    })
})

module.exports = users;