/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import BaseController from "./common/BaseController";
import {router} from "../decorators/Web";

const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`respond with asynv await ${time} ms`)
    }, time)
  });
};

function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey:string, descriptor:PropertyDescriptor) {
    console.log("f(): called");
  }
}

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
}

// const user = new UserController()
export default UserController