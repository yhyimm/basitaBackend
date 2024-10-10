const serviceModel = require('../models/serviceModel');
// we need to add token stuff later and also admin controllers


const getServices = (req, res) => {
    serviceModel.find({lang:'EN'}).sort({ orderOfDisplay: 1 })
    .then(result =>{
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('error getting services');
    });
};

const getServiceByName = (req, res) =>{
    const serviceName = req.parms.name;

    serviceModel.find({name:serviceName,lang:'EN'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting service ${serviceName}');
    });
};

const getServicesAr = (req,res) =>{
    serviceModel.find({lang:'AR'}).sort({orderOfDisplay:1})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting services');
    });
};

const getServiceByNameAr = (req, res) =>{
    const serviceName = req.parms.name;

    serviceModel.find({name:serviceName, lang:'AR'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting service ${serviceName}');
    });
};

module.exports = {
    getServices,
    getServicesAr,
    getServiceByName,
    getServiceByNameAr
};