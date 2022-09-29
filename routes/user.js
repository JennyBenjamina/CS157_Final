const express = require("express");
const User = require("../models/user.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, result) => {
    if(!err){
      if(!result){
        let newUser = new User(req.body);

        newUser.password = bcrypt.hashSync(newUser.password, 10);
        newUser.save((err, result) => {
          if(!err){
            res.status(200).send(result);
          }else{
            res.status(400).send(err);
          }
        })
      }else{
        res.status(400).send("email account exists!");
      }
    }else{
      res.status(400).send(err);
    }
  })
})



router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email}, (err, result) => {
    if(!err){
      if(result){
        bcrypt.compare(req.body.password, result.password, (error, bcresult) => {
          if(bcresult){
            let payLoad = {
              _id: result._id,
              role: result.role
            }

              let token = jwt.sign(payLoad, process.env.JWTKEY || "12345678");
              res.status(200).send({
                jwt: token
              })

          }else{
            res.status(400).send("Invalid email/password");
          }
        })
      }else{
         res.status(400).send("Invalid email/password");
      }
    }else{
      res.status(400).send("Invalid email/password");
    }
  })
})



module.exports = router;