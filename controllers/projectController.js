const projectModel = require('../models/projectModel');

const jwt = require('jsonwebtoken');
const key = 'd2f9c1a6b3e0e7d8f1a4b9c2f5e3b6a0d4c8e2a7f0b1d9c3f4e5a1b7d2c6f9e3';

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

const addProject = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);
    
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const body = req.body;
    
    if (req.file) {
        // make the body image as the name of the file
        body.image = req.fileName;
    }

    body.order_of_display = parseInt(body.order_of_display);
    const project = new ourProjects(body);
    project.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error saving project', error: err });
        });
        project = new projectModel(body);

}

const updateProject = (req, res) => {
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);
    
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    
        const id = req.params.id;
        const body = req.body;
    
        if (req.file) {
            body.image = req.fileName;
        }
    
        body.order_of_display = parseInt(body.order_of_display);
        projectModel.findByIdAndUpdate(id, body, { new: true })
            .then(result => {
                res.send(result);
            }).catch(err => {
                console.log(err);
            });
    }


const deleteProject = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const id = req.params.id;

    projectModel.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error deleting project');
        });
};    


module.exports = {
    getProjects,
    getProjectsAr,
    getProjectByName,
    getprojectByNameAr,
    addProject,
    updateProject,
    deleteProject
};