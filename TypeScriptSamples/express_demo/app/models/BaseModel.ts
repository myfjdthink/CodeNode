'use strict';
import {Document} from "mongoose";
import mongoose = require('mongoose');
import {Model} from "mongoose";

/**
 * Module dependencies.
 */

class BaseModel {
  static _model:Model<Document>;
  

  inspect(options?:Object):string {
    return ''
  }
}

export default BaseModel