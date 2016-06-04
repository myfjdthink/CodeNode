/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import BaseController from "./common/BaseController";
import {router} from "../decorators/Web";
import Order from '../models/Order'

const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`respond with asynv await ${time} ms`)
    }, time)
  });
};

class UserController extends BaseController {
  @router({
    method: 'get',
    path: '/user/login'
  })
  async aotoRoute(req:e.Request, res) {
    var id = req.query.id;
    var abc = req.param('abc');
    console.log('UserController', 'aotoRoute', id, abc);
    let result = await timeOut(10);
    res.send(result);
  }

  @router({
    method: 'get',
    path: '/user/findOne'
  })
  async findOne(req:e.Request, res) {
    console.log('UserController', 'findOne');
    let result = await Order.findById('54ce6d7779337f164b36504a');
    const amount = result.amount
    console.log('amount', amount);
    res.send(result);
  }
}

// const user = new UserController()
export default UserController