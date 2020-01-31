const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

/*
    Route: POST user/login
    -Takes username and password in request body and checks if the are valid.
    -Creates JWT token and sends it in response
    -public accesss
*/
router.post("/login", (req, res) => {
  User.find({ username: req.body.username }).then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Authenticaiton failed"
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h"
          }
        );
        return res.status(200).json({
          message: "Authenticaton successful",
          token
        });
      }
      res.status(401).json({
        message: "Authentication failed"
      });
    });
  });
});

/*
    Route: POST user/register
    -Create new user with hashed password to the database
    -public accesss
*/
router.post("/register", (req, res) => {
  User.find({ username: req.body.username }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Username is already taken"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const newUser = new User({
            username: req.body.username,
            password: hash
          });

          newUser
            .save()
            .then(() =>
              res.status(201).json({
                message: "User created"
              })
            )
            .catch(err => res.status(500).json({ error: err }));
        }
      });
    }
  });
});

module.exports = router;
