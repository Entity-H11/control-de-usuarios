/* const express = require('express');

const router = express.Router();

router.use(function timelog(req, res, next){

console.log('Time: ', Date.now());
next();
});

router.get('/',(req,res)=> {

    res.send('welcon to my apiBird');
});
route.get('/about',(req,res)=>{
 res.send('about this birds');
});

module.exports = router; */
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
//hikla
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router