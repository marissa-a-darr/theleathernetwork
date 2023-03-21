const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');

function getUsers(req, res) {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function saveUser(req, res) {
  User.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}

function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .populate({ path: 'friends', select: '-__v' })
    .populate({ path: 'thoughts', select: '-__v' })
    .select('-__v')
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Sorry! Found no users matching to that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function updateSingleUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Sorry! Found no users matching to that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Sorry! Found no users matching to that ID' });
    });
}

function addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Sorry! Found no users matching to that ID' });
      }
    })
    .catch((err) => res.status(500).json(err));
}

function deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'Sorry! Found no users matching to that ID' });
      }
    })
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getUsers,
  getSingleUser,
  saveUser,
  updateSingleUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
