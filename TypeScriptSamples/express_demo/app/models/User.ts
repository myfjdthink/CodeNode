import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {Document} from "mongoose";
import {Model} from "mongoose";
'use strict';

/**
 * Module dependencies.
 */


class User extends BaseModel {
  _model:any;
  phone:string;

  constructor(document:User) {
    super()
    this._model = document;
  }

  findOne(obj:Object) {
    return this._model.findOne(obj)
  };
}

const _schema = new Schema({
  phone: {type: String}
}, {collection: 'user', id: true});

// const model = mongoose.model < User >('User', _schema);
// const instance = new User(model)
//User.findOne = _model.findOne

export {User}
// export {instance}