'use strict';

/**
 * Module dependencies.
 */

import mongoose = require('mongoose');


const Schema = mongoose.Schema;


/**
 * Order Schema
 */

const OrderSchema = new Schema({

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

OrderSchema.path('amount').required(true, 'Order amount cannot be blank');
OrderSchema.path('status').required(true, 'Order status cannot be blank');

/**
 * Pre-remove hook
 */

OrderSchema.pre('remove', function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'Order');

  next();
});

/**
 * Methods
 */

OrderSchema.methods = {

  /**
   * Save Order and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function (image) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

    /*
     if (images && !images.length) return this.save();
     const imager = new Imager(imagerConfig, 'S3');

     imager.upload(images, function (err, cdnUri, files) {
     if (err) return cb(err);
     if (files.length) {
     self.image = { cdnUri : cdnUri, files : files };
     }
     self.save(cb);
     }, 'Order');
     */
  }
};

/**
 * Statics
 */

OrderSchema.statics = {
  /**
   * List Orders
   *
   * @param {Object} options
   * @api private
   */

  list: async function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    await this.find(criteria)
      .populate('user', 'name username')
      .sort({createdAt: -1})
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

var Order = mongoose.model('Order', OrderSchema);

//async function main() {
//  let kittens = await Order.find({}).limit(5).exec()
//  console.log(kittens);
//}
//
//main()
