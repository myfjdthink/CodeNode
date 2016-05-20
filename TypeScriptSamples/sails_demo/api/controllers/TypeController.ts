/**
 * TypeController
 *
 * @description :: Server-side logic for managing Types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import express = require("express")
import BaseController from './BaseController';

class TypeController extends BaseController {
  index(req:express.Request, res:express.Response) {
    const ud = req.param('ud')
    const order_id = req.param('order_id')

    console.log('func', this.required);
    if (this.required(ud, order_id)) {
      res.status(200).json('缺少参数')
    } else {
      res.status(200).json({users: {ud: ud, order_id: order_id}})
    }
  }
}


const type = new TypeController()
const index = type.index
export {index,TypeController}

