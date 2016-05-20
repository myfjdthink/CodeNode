/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import mongoose = require('mongoose');


const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`respond with asynv await ${time} ms`)
    }, time)
  });
};

class OrderController {
  async awaitTest(req:e.Request, res) {
    console.log('OrderController', 'awaitTest');
    let result = await timeOut(10);
    res.send(result);
  }

  async list(req:e.Request, res:e.Response) {
    console.log('OrderController', 'list');
    const Order = mongoose.model('Order')
    let result = await Order.find({}).limit(5).exec()
    console.log('aaaaa', result.length);
    res.status(200).json(result);
  }
}

export default OrderController