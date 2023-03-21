const {
  getThoughts,
  getSingleThought,
  createThought,
  createReaction,
  deleteReaction,
  updateThought,
  deleteThought,
} = require('../controllers/thoughtsReactionsController');

const thoughtsReactionRouter = require('express').Router();

thoughtsReactionRouter.get('/thoughts', (req, res) => {
  getThoughts(req, res);
});

thoughtsReactionRouter.get('/thoughts/:thoughtId', (req, res) => {
  getSingleThought(req, res);
});

thoughtsReactionRouter.post('/thoughts', (req, res) => {
  createThought(req, res);
});

thoughtsReactionRouter.put('/thoughts/:thoughtId', (req, res) => {
  updateThought(req, res);
});

thoughtsReactionRouter.delete('/thoughts/:thoughtId', (req, res) => {
  deleteThought(req, res);
});

thoughtsReactionRouter.post('/thoughts/:thoughtId/reactions', (req, res) => {
  createReaction(req, res);
});

thoughtsReactionRouter.delete(
  '/thoughts/:thoughtId/reactions/:reactionId',
  (req, res) => {
    deleteReaction(req, res);
  }
);

module.exports = thoughtsReactionRouter;
