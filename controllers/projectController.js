const projectModel = require('../models/projectModel');

// we need to add token stuff later and also admin controllers

const getProjects = (req, res) => {
    projectModel.find({lang:'EN'}).sort({ orderOfDisplay: 1 })
    .then(result =>{
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('error getting projects')
    });
};

const getProjectByName = (req, res) => {
    const projectName = req.parms.name;

    projectModel.find({name:projectName,lang:'EN'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting project ${projectName}');
    });
};

const getProjectsAr = (req, res) =>{
    projectModel.find({lang:'AR'}).sort({orderOfDisplay:1})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting projects');
    });
};

const getprojectByNameAr = (req, res) =>{
    const projectName = req.parms.name;
    projectModel.find({name:projectName,land:'AR'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting project ${projectName}');
    });
};

module.exports = {
    getProjects,
    getProjectsAr,
    getProjectByName,
    getprojectByNameAr
};