/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import web = require('../decorators/Web');
import BaseController from "./common/BaseController";
import {Controller, Get, PathParams} from "ts-express-decorators";

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

@Controller("/user_fund")
class UserController extends BaseController{

  @Get("/:id")
  async aotoRoute(req:e.Request, res) {
    var id = req.param('id');
    console.log('UserController', 'aotoRoute', id);
    let result = await timeOut(10);
    res.send(result);
  }
}

// const user = new UserController()
export default UserController