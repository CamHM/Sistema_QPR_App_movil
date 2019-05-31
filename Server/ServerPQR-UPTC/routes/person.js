var express = require('express');
var router = express.Router();
var db = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM PERSON', (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
        res.status(200).json(results.rows);
    }
  })
});

module.exports = router;