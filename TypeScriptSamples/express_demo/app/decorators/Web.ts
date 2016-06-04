/**
 * Created by nick on 16/6/4.
 */

import ServerLoader from "../../ServerLoader";

export function router(config:{path:string, method:string}) {
  return (target:any, name:string, value:PropertyDescriptor) => {
    // console.log('ServerLoader', ServerLoader);
    ServerLoader.__DecoratedRouters.set({
      target: target,
      path: config.path,
      method: config.method
    }, target[name])
  }
}