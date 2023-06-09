create user

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

router.post("/createuser", body('email', 'incorrect email').isEmail(),
  body('name', 'length minmam 5').isLength({ min: 5 }),
  body('password', 'incorrect password').isLength({ min: 5 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }

  })

router.post("/loginuser", [
  body('email', 'incorrect email').isEmail(),
  body('password', 'incorrect password').isLength({ min: 5 })]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "try login with correct email & password" });
      }
      if (req.body.password !== userData.password) {
        return res.status(400).json({ errors: "try login with correct email & password" });
      }

      return res.json({ success: true })
    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }

  })

module.exports = router;