const express = require('express');
const validation = require('../validation/userAuth');
const controller = require('../controllers/userAuth');


const Router = express.Router();

Router.post('/SignUp',
    validation.validateSignUp,
    validation.validatePassword,
    controller.SignUp
);

Router.post('/SignIn',
    validation.validateSignIn,
    controller.SignIn
)

module.exports = Router