const express = require('express');

const router = express.Router();
const viewController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const { route } = require('express/lib/application');

router.use(authController.isLoggedin);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.loginForm);

module.exports = router;
