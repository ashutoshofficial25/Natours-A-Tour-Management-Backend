const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
//Get All tours

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Restricted to Admin
router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;
