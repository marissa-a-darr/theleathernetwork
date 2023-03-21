const userRouter = require('express').Router();
const {
  getUsers,
  getSingleUser,
  saveUser,
  updateSingleUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('./../controllers/userController');

userRouter.get('/users', (req, res) => {
  getUsers(req, res);
});

userRouter.get('/users/:userId', (req, res) => {
  getSingleUser(req, res);
});

userRouter.post('/users', (req, res) => {
  saveUser(req, res);
});

userRouter.put('/users/:userId', (req, res) => {
  updateSingleUser(req, res);
});

userRouter.delete('/users/:userId', (req, res) => {
  deleteUser(req, res);
});

userRouter.post('/users/:userId/friends/:friendId', (req, res) => {
  addFriend(req, res);
});

userRouter.delete('/users/:userId/friends/:friendId', (req, res) => {
  deleteFriend(req, res);
});

module.exports = userRouter;
