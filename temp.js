// i want to save an admin to the database
const username = 'admin';
const password = 'admin';
const Admin = require('./models/adminModel');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:basitaAdmin@basita-cluster.foqtz.mongodb.net/Basita?retryWrites=true&w=majority&appName=Basita-Cluster')
    .then(() =>{
        console.log('connected to mongodb');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));

const admin = new Admin({
    username,
    password
    });

admin.save().then(() => {
    console.log('Admin saved');
}).catch((err) => {
    console.log(err);
});