var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', auth, function (req, res, next) {
  res.render('admin/index', {
    layout: 'admin',
    title:'admin'
  })
});

module.exports = router;