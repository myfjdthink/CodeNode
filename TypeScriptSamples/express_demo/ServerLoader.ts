import Mongoose = require('mongoose');
import * as express from "express";
import * as Logger from "log-debug";
// import UserController from "./app/controllers/UserAccountController";
// let a = express.Router()

const port = process.env.PORT || 3000;
class ServerLoader {
  static __DecoratedRouters:Map<{target:any, method:string, path:string}, Function | Function[]> = new Map()
  private router:any
  private app:express.Application

  constructor() {
    this.app = express()
    this.router = null
  }

  registerRouters() {
    Logger.info('registerRouters...');
    for (let [config, controller] of ServerLoader.__DecoratedRouters) {
      let controllers = Array.isArray(controller) ? controller : [controller]
      // controllers.forEach((controller) => this.router[config.method](config.path, controller))
      controllers.forEach((controller) => {
        console.log('find router', config.method, config.path, controller.name);
        this.app[config.method](config.path, controller);
      })
    }
  }

  start() {
    this.config()
    this.registerRouters()
    this.listen(port)
  }

  connectDB(port:number) {

  }

  config() {
    Logger.info('config server...');
    // this.app.get('/user/aotoRoute', new UserController().aotoRoute);
  }

  listen(port:number) {
    this.app.listen(port)
  }

  static initialize() {

    Logger.info('Initialize server');

    return new ServerLoader().start()

  }
}

export default ServerLoader