import mongoose = require('mongoose');
import * as express from "express";
import * as Logger from "log-debug";
import {RouterMap} from "./app/decorators/Web";

// let a = express.Router()

const port = process.env.PORT || 3000;
class ServerLoader {
  //static __DecoratedRouters:Map<{target:any, method:string, path:string}, Function | Function[]> = new Map()
  private router:any
  private app:express.Application

  constructor() {
    this.app = express()
    this.router = null
  }

  start() {
    this.connectDB()
      .on('error', console.log)
      .on('disconnected', this.connectDB)
      .once('open', ()=> this.listen());
  }

  connectDB() {
    const options = {server: {socketOptions: {keepAlive: 1}}};
    var uri = 'mongodb://localhost:57017/user_koala';
    Logger.info(`connect to  ${uri} ...`);
    return mongoose.connect(uri, options).connection;
  }

  config() {
    Logger.info('config...');
    this.initModels()
    this.registerRouters()
    // this.app.get('/user/aotoRoute', new UserController().aotoRoute);
  }

  initModels() {
    Logger.info('Bootstrap models...');
    //Bootstrap models
    const fs = require('fs');
    const join = require('path').join;
    const models = join(__dirname, 'app/models');
    fs.readdirSync(models)
      .filter(file => ~file.search(/^[^\.].*\.js$/))
      .forEach(file => require(join(models, file)));
  }

  registerRouters() {
    Logger.info('registerRouters...');
    for (let [config, controller] of RouterMap.__DecoratedRouters) {
      let controllers = Array.isArray(controller) ? controller : [controller]
      // controllers.forEach((controller) => this.router[config.method](config.path, controller))
      controllers.forEach((controller) => {
        Logger.info('find router', config.method, config.path, controller.name);
        this.app[config.method](config.path, controller);
      })
    }
  }

  listen() {
    this.config()
    this.app.listen(port)
  }

  static initialize() {

    Logger.info('Initialize server');

    return new ServerLoader().start()

  }
}

export default ServerLoader