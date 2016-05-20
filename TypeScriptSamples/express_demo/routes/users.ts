import express = require('express');
import {resolve} from "url";
let router = express.Router();

const timeOut = function (time){
  return new Promise(function (resolve){
    setTimeout(function () {
      resolve('respond with asynv await')
    }, time)
  });
};
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let result = await timeOut(100);
  res.send(result);
});

router.get('/aa', function (req, res, next) {
  res.send('respond with a aaaa');
});

//exports.router = router;
module.exports = router;
//export {router}
