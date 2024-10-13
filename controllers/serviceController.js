const serviceModel = require('../models/serviceModel');
const jwt = require('jsonwebtoken');
const key = 'd2f9c1a6b3e0e7d8f1a4b9c2f5e3b6a0d4c8e2a7f0b1d9c3f4e5a1b7d2c6f9e3';

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


const addService = (req, res) => {
    
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
        const service = new serviceModel(body);
    
        service.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error adding service');
        });
    };

const updateService = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const id = req.params.id;
    const body = req.body;

    if(req.file){
        body.image = req.fileName;
    }
    body.orderOfDisplay = parseInt(body.orderOfDisplay);

    serviceModel.findByIdAndUpdate(id, body, { new: true })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error updating service');
        });
};    

const deleteService = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const id = req.params.id;

    serviceModel.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error deleting service');
        });
};


module.exports = {
    getServices,
    getServicesAr,
    getServiceByName,
    getServiceByNameAr,
    addService,
    updateService,
    deleteService
};