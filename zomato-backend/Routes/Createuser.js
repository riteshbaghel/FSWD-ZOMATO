const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtsecret = (process.env.JWTSECRET)


router.post("/createuser", [
  body('email', 'incorrect email').isEmail(),
  body('name', 'length minmam 5').isLength({ min: 5 }),
  body('password', 'incorrect password').isLength({ min: 5 })]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: securepassword,
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
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "try login with correct email & password" });
      }
      const data = {
        user: {
          id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtsecret)

      return res.json({ success: true, authToken: authToken })
    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }

  })

module.exports = router;