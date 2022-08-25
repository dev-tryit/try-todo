import DateUtil from './DateUtil';

class log {
  static info(message: string, obj?:any) {
    if (obj) {
      const jsonObj =
        obj instanceof Map ? JSON.stringify(Object.fromEntries(obj), null, 2) : JSON.stringify(obj, null, 2);
      console.info(`${DateUtil.nowWithKST()}, ${message}, ${jsonObj}`);
    } else {
      console.info(`${DateUtil.nowWithKST()}, ${message}`);
    }
  }

  static error(message: string, obj?:any) {
    if (obj) {
      const jsonObj =
        obj instanceof Map ? JSON.stringify(Object.fromEntries(obj), null, 2) : JSON.stringify(obj, null, 2);
      console.error(`${DateUtil.nowWithKST()}, ${message}, ${jsonObj}`);
    } else {
      console.error(`${DateUtil.nowWithKST()}, ${message}`);
    }
  }
}

export default log;
