export class InstanceManager {
  private static map = {};

  public static track() {
    const name = InstanceManager.callerName;
    const map = InstanceManager.map;
    map[name] = (map[name] || 0) + 1;
    if (map[name] > 1) {
      console.warn(`${name} has ${map[name]} instances`);
      console.log(JSON.stringify(map));
    }
  }

  private static get callerName() {
    try {
      throw new Error('test');
    } catch (e) {
      // console.log(e);
      return (<Error>e).stack
        .split('at')[4]
        .split('(')[0]
        .replace('new', '')
        .trim();
    }
  }
}
