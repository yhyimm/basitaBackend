const memberModel = require('../models/team-memberModel')
// we need to add token stuff later and also admin controllers

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

module.exports = {
    getMembers
};
