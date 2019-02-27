const express = require('express');
const router = express.Router();

//Authentication 
const isAuth = require('../validation/isAuth');

//Inuput Validation
const registerValidation = require('../validation/registerValidation');
const loginValidation = require('../validation/loginValidation');

//Controllers
const dashboardController = require('../controllers/dashboardController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

//DashBoard Routes
router.get('/', isAuth, dashboardController.GET);
router.get('/dashboard', isAuth, dashboardController.GET);

//LOGIN ROUTES
router.get('/login', loginController.GET);
router.post('/login', loginValidation, loginController.POST);

//REGISTER ROUTES
router.get('/register', registerController.GET);
router.post('/register', registerValidation, registerController.POST);

module.exports = router;
