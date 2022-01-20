const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts, singleThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing user
  await User.deleteMany({});

  // Drop existing thought
  await Thought.deleteMany({});

  // Add user to the collection and await the results

  try {
    const res = await User.collection.insertMany(users);
    console.log(res.ops);
  } catch (error) {
    return console.log(err);
  }
  // Add thought to the collection and await the results
  try {
    const res = await Thought.collection.insertMany(thoughts);
    console.log(res.ops);
  } catch (error) {
    return console.log(err);
  }
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(singleThoughts);
  // console.table(assignments);
  console.info('Seeding complete!');
  process.exit(0);
});