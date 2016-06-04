/**
 * Created by nick on 16/6/4.
 */
import ServerLoader from "./ServerLoader";

import UserAccountController from "./app/controllers/UserAccountController";
import OrderController from "./app/controllers/OrderController";
new UserAccountController()
new OrderController()

ServerLoader.initialize()