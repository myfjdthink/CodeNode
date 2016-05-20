"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require('express');
let router = express.Router();
const timeOut = function (time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('respond with asynv await');
        }, time);
    });
};
/* GET users listing. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield timeOut(100);
        res.send(result);
    });
});
router.get('/aa', function (req, res, next) {
    res.send('respond with a aaaa');
});
//exports.router = router;
module.exports = router;
//export {router}
//# sourceMappingURL=users.js.map