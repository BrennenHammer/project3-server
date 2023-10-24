var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken")
const User = require('../models/User');

const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/', (req, res, next) => {

  User.find()
    .then((allUsers) => {
      res.json(allUsers)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
      next(err)
    })

})

router.get('/detail/:userId', (req, res, next) => {

  const userId = req.params.userId;

  User.findById(userId)
  
    .then((foundUser) => {
      const { _id, email, name , posts, image } = foundUser;

      const userInfo = { _id, email, name, posts, image };
      res.json(userInfo)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
      next(err)
    })

})

router.post("/update", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id, 
    req.body, 
    { new: true }
    )
    .then((updatedUser) => {
      return updatedUser.populate('posts')
    })
    .then((populatedUser) => {
      const { _id, email, name, posts, location, image } = populatedUser
      const user = { _id, email, name, posts, location, image };
      const authToken = jwt.sign(user, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      })
      
      res.json({user, authToken});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});
module.exports = router;
