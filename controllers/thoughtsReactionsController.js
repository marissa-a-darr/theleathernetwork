const { ObjectId } = require('mongoose').Types;
const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

function getThoughts(req, res) {
  Thought.find()
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

function getSingleThought(req, res) {
  Thought.findById({ _id: req.params.thoughtId })
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
}

function createThought(req, res) {
  Thought.create(req.body)
    .then((thought) =>
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      )
    )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'No user with that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) => {
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: 'No user with that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Error updating thought, try again' });
    });
}

function deleteThought(req, res) {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) => {
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Error deleting thought, try again.' });
    });
}

function createReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'No user with that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

function deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'No user with that ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
