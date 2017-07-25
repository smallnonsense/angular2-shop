import { InstanceManager } from './';

export function SingletoneNotifier
  <T extends { new(...args: any[]): {} }>(constructor: T) {
  return class SingletoneNotifierImpl extends constructor {
    constructor(...args) {
      console.log(args);
      super(...args);
      InstanceManager.track();
    }
  };
}

export function MethodDecorator(
  constructor: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>) {
  const method = descriptor.value;
  return function() {
    console.log(arguments);
    method.apply(this, arguments);
  }.apply(this, arguments);
  // return class SingletoneNotifierImpl extends constructor {
  //   constructor(...args) {
  //     console.log(args);
  //     super(...args);
  //     InstanceManager.track();
  //   }
  // };
}
