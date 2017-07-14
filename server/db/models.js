const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
  create_time: Date,
});

const User = mongoose.module('UserSession', userSchema);

module.exports = User;
