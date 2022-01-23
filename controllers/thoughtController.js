const { Thought, User } = require('../models');

module.exports = {
    // get all thought
    getThoughts(req, res) {
        Thought.find()
        .then(async(thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId })
        .then(async(singleThoughts) => {
            return res.json(singleThoughts)
        })
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(async(createThought) => {
        return User.findOneAndUpdate({ _id: req.body.userId });
        })
        .then((createThought) => {
            return res.json(createThought);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        }); 
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body }, 
            { new: true }
            )
        .then(async(updateThought) => {
            return res.json(updateThought)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          }); 
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(async (deleteFriend) => {
        return res.json(deleteFriend)
        })
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        }); 
    },
    // add reaction
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId, 
            { $addToSet: { reactions: req.body } }, 
            { runValidators: true, new: true }
        )
        .then(async (addReaction) => {
            return res.json(addReaction)
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          }); 
    },
        // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: req.body } }, 
            { runValidators: true, new: true }
            )
        .then(async (deleteReaction) => {
        return res.json(deleteReaction)
        })
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        }); 
    },
}