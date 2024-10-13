const memberModel = require('../models/team-memberModel')
const jwt = require('jsonwebtoken');
const key = 'd2f9c1a6b3e0e7d8f1a4b9c2f5e3b6a0d4c8e2a7f0b1d9c3f4e5a1b7d2c6f9e3';

const getMembers = (req, res) => {
    memberModel.find().sort({orderOfDisplay: 1})
    .then(result => {
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting members');
    });
};


const addMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const body = req.body;

    if(req.file){
        body.image = req.file.originalname;
    }

    body.orderOfDisplay = parseInt(body.orderOfDisplay);
    const member = new memberModel(body);

    member.save()
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error adding member');
    });
};

const updateMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const id = req.params.id;

    if(req.file){
        req.body.image = req.file.originalname;
    }

    const body = req.body;

    memberModel.findByIdAndUpdate(id, body)
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error updating member');
    });
};

const deleteMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const id = req.params.id;

    memberModel.findByIdAndDelete(id)
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error deleting member');
    });
};

module.exports = {
    getMembers,
    addMember,
    updateMember,
    deleteMember
};
