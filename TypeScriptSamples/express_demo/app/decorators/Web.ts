import RouteDecoratorAble from "../controllers/common/RouteDecoratorAble";

function enumerable(value:boolean) {
  return function (target:any, propertyKey:string, descriptor:PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

function controller(baseUrl:string) {
  return function (constructor:RouteDecoratorAble, aaaa :any) {
    console.log('targettargettargettarget', typeof constructor.constructor);
    console.log('aaaaaaaaaaaaaaaa', aaaa);
    console.log('prototypeprototypeprototypeprototype', constructor.constructor.prototype);
  };
}

function route(method:string, value:string) {
  return function (target:any, propertyKey:string, descriptor:PropertyDescriptor) {
    console.log('routerouterouterouteroute', typeof target);
  };
}

export {controller,route}
