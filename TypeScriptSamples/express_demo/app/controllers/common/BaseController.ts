/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import RouteDecoratorAble from "./RouteDecoratorAble";

class BaseController extends RouteDecoratorAble{

  aotoRoute(req:e.Request, res) {

  }
}

//const user = new BaseController()
export default BaseController