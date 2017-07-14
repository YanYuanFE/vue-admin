const express = require('express');

const moment = require('moment');

const objectIdToTimestamp = require('objectid-to-timestamp');
const sha1 = require('sha1');
const router = express.Router();

const User = require('../db/models');


const Register = (req, res) => {
  let userRegister = new userRegister({
    name: req.body.name,
    password: sha1(req.body.password),
  });

  userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
    .format('YYYY-MM-DD HH:mm:ss');
  User.findOne({
    name: (userRegister.name).toLowerCase(),
  })
  .then((user) => {
    if (user) {
      res.json({
        success: false,
        error: '该用户名已被使用',
      });
    } else {
      userRegister.save((err, user) => {
        if (err) {
          res.json(err);
        } else {
          res.json(user);
        }
      });
    }
  })
  .catch(err => res.json(err));
};

const Login = (req, res) => {
  let userLogin = new User({
    name: req.body.name,
    password: sha1(req.body.password),
  });
  User.findOne({
    name: userLogin.name,
  })
  .then((user) => {
    if (!user) {
      res.json({
        success: false,
        message: '用户名不存在',
      }),
    } else if (userLogin.password === user.password) {
      var name = req.body.name;
      user.password = null,
      req.session.user = user;
      res.json({
        success: true,
        message: '登录成功',
        name: user.name,
        time: moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
      })
    } else {
      res.json({
        success: false,
        message: '密码错误',
      })
    }
  })
  .catch(err => res.json(err))

  

}