const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id', (req,res) => {
    var id = req.params.id;
    User
        .findById(req.params.id, (err, user) => {
            if (user != null){
                res.status(200).json(user);
            }else{
                res.status(404).send('User not found.');
            }
            
        });
});

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.post('/', (req,res) => {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    user
        .save(function (err, result) {
            if (err) return handleError(err);
            res.status(201).send(result);
    });
});

router.put('/:id', (req,res) => {
    var id = req.params.id;
    User
        .findByIdAndUpdate(id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, (err, result) => {
            if (err) return handleError(err);
            res.status(204).send(result);
        });
});

router.delete('/:id',(req,res) => {
    var id = req.params.id;
    User
        .findByIdAndRemove(id, (err, result) => {
            if (err) return handleError(err);
            res.status(200).send(result);
        });
});

module.exports = router;