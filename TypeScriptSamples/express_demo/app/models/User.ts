'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {Document} from "mongoose";
import {Model} from "mongoose";


const _schema = new Schema({
  phone: {type: String}
}, {collection: 'user', id: true});
const model = mongoose.model < Document >('User', _schema);

class User extends BaseModel {
  static _schema
  static _model
  static initConection(){
    User._model = mongoose.model < Document >('User',User._schema);
  }
  private _document:any;

  constructor(document:User) {
    super()
    this._document = document;
  }

  model() {
    return User._model
  };

  get phone():string {
    return this._document.phone;
  }
}

export {User}
