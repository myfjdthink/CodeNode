'use strict';

/**
 * Module dependencies.
 */

import mongoose = require('mongoose');


const Schema = mongoose.Schema;


interface IOrder extends mongoose.Document {
  amount: string;
  oType: string;
  pType: string;
  status: string;
  createdAt: Date;
}

/**
 * Order Schema
 */

const _schema = new Schema({

  amount: {type: Number},
  oType: {type: Number},
  pType: {type: Number},
  status: {type: Number},
  bankcard: {type: String},
  //product: {type: Object},
  //products: {type: Array},
  parent_id: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {collection: 'order', id: true});

/**
 * Validations
 */

_schema.path('amount').required(true, 'Order amount cannot be blank');
_schema.path('status').required(true, 'Order status cannot be blank');

/**
 * Pre-remove hook
 */

_schema.pre('remove', function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'Order');

  next();
});

///**
// * Methods
// */
//
//_schema.methods = {
//
//  /**
//   * Save Order and upload image
//   *
//   * @param {Object} images
//   * @api private
//   */
//
//  uploadAndSave: function (image) {
//    const err = this.validateSync();
//    if (err && err.toString()) throw new Error(err.toString());
//    return this.save();
//
//    /*
//     if (images && !images.length) return this.save();
//     const imager = new Imager(imagerConfig, 'S3');
//
//     imager.upload(images, function (err, cdnUri, files) {
//     if (err) return cb(err);
//     if (files.length) {
//     self.image = { cdnUri : cdnUri, files : files };
//     }
//     self.save(cb);
//     }, 'Order');
//     */
//  }
//};
//
///**
// * Statics
// */
//
//_schema.statics = {
//  /**
//   * List Orders
//   *
//   * @param {Object} options
//   * @api private
//   */
//
//  list: async function (options) {
//    const criteria = options.criteria || {};
//    const page = options.page || 0;
//    const limit = options.limit || 30;
//    await this.find(criteria)
//      .populate('user', 'name username')
//      .sort({createdAt: -1})
//      .limit(limit)
//      .skip(limit * page)
//      .exec();
//  }
//};

//interface IUserModel extends IOrder, mongoose.Document { }
const _model = mongoose.model < IOrder >('Order', _schema);

class Order {

  ///**
  // *
  // * @returns {Promise<IOrder[]>}
  // */
  //static async list():Order[] {
  //  let orders:Order[] = []
  //  let err = null
  //  try {
  //    orders = await _model.find({}).exec()
  //  } catch (innerErr) {
  //    err = innerErr
  //  }
  //  orders = orders.map(order => {
  //    return new Order(order)
  //  })
  //  return new Promise < IOrder[] >((resolve, reject) => {
  //    err ? reject(err) : resolve(orders);
  //  })
  //}


  /**
   * static
   * @param id
   * @returns {Promise<Order>}
   */
  static findById(id:string):Promise < Order > {
    console.log('findById2', ' 执行 ');
    return new Promise<Order>((resolve, reject) => {
      _model.findById(id, (err, order) => {
        err ? reject(err) : resolve(new Order(order))
      })
    });
  }

  /**
   * static
   * @param id
   * @returns {Promise<Order>}
   */
  static findById2(id:string):Promise < Order > {
    return new Promise<Order>((resolve, reject) => {
      _model.findById(id)
        .exec()
        .onResolve((err, order) => {
          err ? reject(err) : resolve(new Order(order))
        });
    });
  }

  /**
   *
   */
  private _document:IOrder;

  /**
   * 构造器
   * @param document
   */
  constructor(document:IOrder) {
    this._document = document;
  }

  get amount():string {
    return this._document.amount;
  }
}

export default Order

////console.log(' 见鬼了');
//async function main() {
//  console.log('findById', Order.findById);
//  let kittens = await Order.findById('')
//  console.log('kittens', kittens);
//}
//
//main()
