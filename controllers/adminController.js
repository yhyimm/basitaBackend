const adminModel = require('../models/adminModel');

const getAdmins = (req, res) => {

    adminModel.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log('error getting admins', err);
            res.status(500).send('error getting admins');
        });
};

module.exports = {
    getAdmins
};