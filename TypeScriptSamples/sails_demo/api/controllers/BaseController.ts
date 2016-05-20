/**
 * Created by nick on 16/5/19.
 */

//interface IResponse{
//  code:String,
//  data:
//}
export default class BaseController {
  constructor() {

  }
  required(...params:String[]) {
    for (let param in params) {
      if (!param) return true
    }
    return true
  }
}