// Endpoint handlers
const express = require('express');
const Wiki = require('../models/wiki.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");


// 5 endpoints

// 1) Search Endpoint

router.get('/search/:term', (req, res) => {
  var filter = {
    $or: [
      { title: { $regex: req.params.term, $options: 'i' } },
      { html: { $regex: req.params.term, $options: 'i' } },
    ],
  };

  Wiki.find(filter).exec(function (err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  });
});


// 2 Return single wiki page GET /api/wiki/:urlName

router.get('/:urlName', (req, res) => {
  // 1) query collection to a document with the urlName (if it exists)
  // 2) increment the page counter and return the document

  Wiki.findOne({ urlName: req.params.urlName }, (err, result) => {
    if (result) {
      // check to make sure the wiki page exists
      result.pageViews++;

      result.save((err, result) => {
        // return the status and the result

        res.status(200).send(result);
      });
    } else {
      res.status(404).send(err);
    }
  });
});

// 3 Create new wiki page POST /api/wiki/

router.post('/', authUser, (req, res) => {
  // 1) create the new wiki object new Wiki(req.body)
  // 2) You save the wiki .save() and return the result
  Wiki.findOne( { urlName: req.body.urlName }, (err, result) => {
    if(!err){
      if(!result){
          let newWiki = new Wiki(req.body);
          newWiki.password = bcrypt.hashSync(newWiki.password, 10);
          newWiki.save(function (err, result) {
            if (!err) {
              res.status(200).send(result);
            } else {
              res.status(400).send(err);
            }
    });
      }else{
        res.status(400).send("Page exists!");
      }
    }else{
      res.status(400).send(err);
    }
  })


});

// 4 Update an existing wiki page PUT /api/wiki/:urlName

router.put('/:urlName', (req, res) => {
  // We can't use the findByIdAndUpdate() because we need to compare the management password BEFORE we update

  // 1) get the document using .findOne()
  // 2) if document is found, compare the stored management password with the one passed into the request
  //    if (result.mPassword == req.body.mPassword) if true
  // 3) set the fields one by one and call the save .save() -> return result

  Wiki.findOne({ urlName: req.params.urlName }, (error, result) => {
    if(!error){
      if (result) {
          //this compares the user inputted password to the bcrypt version
          bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
            if(bcresult){
                result.title = req.body.title;
                result.author = req.body.author;
                result.html = req.body.html;
                result.category = req.body.category;
                result.urlName = req.body.urlName;
                result.updatedDate = Date.now();
                result.save(function (err, result) {
                  if (!err) {
                    res.status(200).send(result);
                  }else{
                    res.status(400).send(err);
                  }
            });
            }else{
              res.status(400).send("Invalid!");
            }
          })
        }else {
          res.status(404).send('The url does not exist');
      }
    }else{
      res.status(400).send(error);
    }
  });
});



router.delete("/delete/:urlName", (req, res) => {

Wiki.findOne({ urlName: req.params.urlName }, (err, result) => {
  if(!err){
    if(result){
      bcrypt.compare(req.query.password, result.password, (err, bcresult) => {
        if(bcresult){
          Wiki.findOneAndDelete({ urlName: req.params.urlName }, (err, result) => {
            if(!err){
              res.status(200).send(result);
            }else{
              res.status(400).send(err);
            }
          })
        }else{
          res.status(400).send(err);
        }
      })
    }else{
      res.status(401).send("Not a valid address");
    }
  }else{
    res.status(400).send(err);
  }
})
})



module.exports = router;
