const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controller');
// const verifyToken = require('../moddlewares/verifyToken');
const {validationSchema} = require('../moddlewares/uservalisationSchemea')


// get all users
router.route('/')
        .get(userControllers.getAllUsers)
        // .get(verifyToken,userControllers.getAllUsers)
  
// register 
router.route('/register')
        .post(validationSchema(),userControllers.register)

// login
router.route('/login')
        .post(userControllers.login)

// logout
router.route('/logout')
        .post(userControllers.logout)

router.route('/:id')
        .get(userControllers.getOnlyUser)
        .patch(userControllers.updateUser)
        
router.route('/forgot-password')
        .post(userControllers.foregetPassword)
        
module.exports = router;