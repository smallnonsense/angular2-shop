export class Proxy {

  public static of<T>(instance: T, callback: (T, Array) => void) {
    const proxy = this;
    Object.keys(instance).forEach(key => {
      if (typeof instance[key] === 'function') {
        proxy[key] = (...args) => {
          callback(instance, args);
          return instance[key].apply(instance, args);
        };
      } else {
        proxy[key] = instance[key];
      }
    });
  }

  public static ofObject = function(instance, callback: Function) {
    const proxy = {};
    Object.keys(instance).forEach(function (key) {
      if (typeof instance[key] === 'function') {
        proxy[key] = function () {
          callback(instance, arguments);
          return instance[key].apply(instance, arguments);
        };
      } else {
        proxy[key] = instance[key];
      }
    });
    return proxy;
  }
}
