import {PopulateOption} from "mongoose";
import {Document} from "mongoose";
import mongoose = require('mongoose');
'use strict';

/**
 * Module dependencies.
 */





class BaseModel {
  id:string;
  _id:any;

  equals(doc:Document):boolean {
    return false
  }

  get(path:string, type?:new(...args:any[]) => any):any {
    return
  }

  inspect(options?: Object): string{
    return ''
  }
  //invalidate(path: string, errorMsg: string, value: any): void;
  //invalidate(path: string, error: Error, value: any): void;
  //isDirectModified(path: string): boolean;
  //isInit(path: string): boolean;
  //isModified(path?: string): boolean;
  //isSelected(path: string): boolean;
  //markModified(path: string): void;
  //modifiedPaths(): string[];
  //populate<T>(callback?: (err: any, res: T) => void): Document;
  //populate<T>(path?: string, callback?: (err: any, res: T) => void): Document;
  //populate<T>(opt: PopulateOption, callback?: (err: any, res: T) => void): Document;
  //populated(path: string): any;
  //remove<T>(callback?: (err: any) => void): Query<T>;
  //save<T>(callback?: (err: any, res: T) => void): void;
  //set(path: string, val: any, type?: new(...args: any[]) => any, options?: Object): void;
  //set(path: string, val: any, options?: Object): void;
  //set(value: Object): void;
  //toJSON(options?: Object): Object;
  //toObject(options?: Object): Object;
  //toString(): string;
  //update<T>(doc: Object, options: Object, callback: (err: any, affectedRows: number, raw: any) => void): Query<T>;
  //validate(cb: (err: any) => void): void;

  isNew:boolean;
  errors:Object;
  schema:Object;
}

export default BaseModel