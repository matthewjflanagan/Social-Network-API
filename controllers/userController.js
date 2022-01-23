const { Thought, User } = require('../models');

module.exports = {
    // Find all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            return res.json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Find Single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('friends')
        .then(async (singleUser) => {
            return res.json(singleUser)
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create (Post) a new user
    createUser(req, res) {
      User.create(req.body)
      .then(async (createUser) => {
        return res.json(createUser)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });      
    },
    // update a user
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $set: req.body }, 
        { new: true }
        )
      .then(async (updateUser) => {
        return res.json(updateUser)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      }); 
    },
    // remove a user 
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
      .then(async (deleteUser) => {
        return res.json(deleteUser)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      }); 
    },
    // add a new friend to a user's list
    addNewFriend(req, res) {
      User.findByIdAndUpdate(
        req.params.userId, 
        { $addToSet: { friends: req.params.friendId } }, 
        { runValidators: true, new: true }
        )
      .then(async (newFriend) => {
        return res.json(newFriend)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      }); 
    },
    // remove a friend from a user's friend list
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then(async (deleteFriend) => {
          return res.json(deleteFriend)
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        }); 
    }

}