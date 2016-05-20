"use strict";
const BaseController_1 = require('./BaseController');
class TypeController extends BaseController_1.default {
    index(req, res) {
        const ud = req.param('ud');
        const order_id = req.param('order_id');
        console.log('func', this.required);
        if (this.required(ud, order_id)) {
            res.status(200).json('缺少参数');
        }
        else {
            res.status(200).json({ users: { ud: ud, order_id: order_id } });
        }
    }
}
exports.TypeController = TypeController;
const type = new TypeController();
const index = type.index;
exports.index = index;
//# sourceMappingURL=TypeController.js.map