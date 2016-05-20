/**
 * Created by nick on 16/5/20.
 */
import e = require('express');

const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('respond with asynv await ${time} ms')
    }, time)
  });
};

class OrderController {
  async list(req:e.Request, res) {
    console.log('OrderController', 'list');
    let result = await timeOut(500);
    res.send(result);
  }
}

export default OrderController