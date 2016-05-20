/**
 * Created by nick on 16/5/19.
 */
"use strict";
//interface IResponse{
//  code:String,
//  data:
//}
class BaseController {
    constructor() {
    }
    required(...params) {
        for (let param in params) {
            if (!param)
                return true;
        }
        return true;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map