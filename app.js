const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const projectsRouter = require('./routes/projectRoute');
const servicesRouter = require('./routes/serviceRoute');
const teamRouter = require('./routes/team-memberRoute');
const adminRouter = require('./routes/adminRoute');

const app = express();
// connect to the database and start the server
mongoose.connect('mongodb+srv://admin:basitaAdmin@basita-cluster.foqtz.mongodb.net/Basita?retryWrites=true&w=majority&appName=Basita-Cluster')
    .then(() =>{
        console.log('connected to mongodb');
        http.createServer(app).listen(3000);
        console.log('listening on port 3000');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));

// don't forget to define the cors policy

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) =>{
    res.locals.path = req.path;
    next();
});

app.use('/projects', projectsRouter);
app.use('/services', servicesRouter);
app.use('/team', teamRouter);
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
    console.error('HTTPS server error:', err);
    res.status(500).send('Internal Server Error');
});


