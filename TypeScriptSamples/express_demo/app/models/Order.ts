'use strict';
import mongoose = require('mongoose');
const Schema = mongoose.Schema;

interface IOrder extends mongoose.Document {
  amount: string;
  oType: string;
  pType: string;
  status: string;
  createdAt: Date;
}

const _schema = new Schema({
  amount: {type: Number},
  oType: {type: Number},
  pType: {type: Number},
  status: {type: Number},
  bankcard: {type: String},
  parent_id: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {collection: 'order', id: true});

_schema.path('amount').required(true, 'Order amount cannot be blank');
_schema.path('status').required(true, 'Order status cannot be blank');

_schema.pre('remove', function (next) {
  next();
});

const _model = mongoose.model < IOrder >('Order', _schema);

class Order {
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
