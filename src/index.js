var express = require('express');
var router = express.Router();

var indexModule = require('./module/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  indexModule.getTodayLog('./src/module/log').then((content)=>{
    console.log(content);
    content = JSON.parse(content);
    var list = [];
    var map = {};

    content.forEach(( item )=>{
      if( !map['user'+item.userId] ){
        list.push( item );
      }
      map['user'+item.userId] = 1;

    })
    console.log(list.length+'-====');
    res.render('index', { list: list,total:content.length});
  }).catch(err=>{
    console.log(err);
    next(err);
  })
  
});

module.exports = router;
