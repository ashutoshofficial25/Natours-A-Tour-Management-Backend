const express = require('express');
const userController = require('./../controllers/userController');
//Get All tours

const router = express.Router();

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
