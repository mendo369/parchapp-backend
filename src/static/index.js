const express = require('express');

const {MediaControllers} = require('./controllers')

const router = express.Router();

module.exports.MediaAPI = (app)=>{
    router
        .get('/', MediaControllers.getAvatars)

    app.use('/api/media', router);//concatena las rutas
};