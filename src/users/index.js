const express = require('express');

const {UsersControllers} = require('./controllers')

const router = express.Router();

module.exports.UsersAPI = (app)=>{
    router
        .get('/', UsersControllers.getUsers)
        .get('/:id', UsersControllers.getUser)
        .post('/', UsersControllers.createUser)
        .put('/:id', UsersControllers.updateUser)
        .delete('/:id', UsersControllers.deleteUser);

    app.use('/api/user', router);//concatena las rutas
};