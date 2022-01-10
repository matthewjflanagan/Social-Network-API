const { Thought, User } = require('../models');

module.exports = {
    // Find all user
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
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
                grade: await grade(req.params.userId),
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

}