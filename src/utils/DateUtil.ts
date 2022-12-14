
import DateOrString from '../type/DateOrString';
import log from './log';

class DateUtil {
  static getTime(createdAt: DateOrString) {
    const currentDate = new Date();
    const date = this.date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`} ${
      hours < 13 ? 'AM' : 'PM'
    }`;
    // if (currentDate.getFullYear() !== year) {
    //   return `${this.getMonth(month)} ${day < 10 ? `0${day}` : `${day}`}. ${year}`;
    // } else {
    //   if (currentDate.getMonth() + 1 !== month || currentDate.getDate() !== day) {
    //     return `${this.getMonth(month)} ${day < 10 ? `0${day}` : `${day}`}`;
    //   } else {
    //     return `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`} ${
    //       hours < 13 ? 'AM' : 'PM'
    //     }`;
    //   }
    // }
  }
  static getChatDate(createdAt: DateOrString) {
    const currentDate = new Date();
    const date = this.date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${this.getMonth(month)} ${day < 10 ? `0${day}` : `${day}`}. ${year}`;
  }
  static getMonth(m: number) {
    let month = '';

    if (m < 10) {
      month = `0${m}`;
    } else {
      month = `${m}`;
    }

    switch (month) {
      case '01':
        return `Jan`;
      case '02':
        return `Feb`;
      case '03':
        return `Mar`;
      case '04':
        return `Apr`;
      case '05':
        return `May`;
      case '06':
        return `Jun`;
      case '07':
        return `Jul`;
      case '08':
        return `Aug`;
      case '09':
        return `Sep`;
      case '10':
        return `Oct`;
      case '11':
        return `Nov`;
      case '12':
        return `Dec`;
      default:
        return '';
    }
  }
  static nowWithKST(): Date {
    //?????? ?????? ??????
    /*
        Date.prototype.getTimezoneOffset()
        ?????? ????????? PC ?????? ?????????????????? UTC ??????????????? ????????? '???'????????? ????????????.
        ????????????, ?????? ????????? UTC?????? 9?????? ????????? ????????? -540??? ????????????.
        */
    const now = new Date(); // ?????? ??????
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // ?????? ????????? utc??? ????????? ??????????????????
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // ?????? ????????? UTC?????? 9?????? ??????(9????????? ??????????????? ??????)
    return new Date(utcNow + koreaTimeDiff); // utc??? ????????? ?????? ?????? ???????????? ??????????????? ?????? 9??????(???????????????)??? ??????
  }

  static subtractHour(dateOrString1: DateOrString, dateOrString2: DateOrString): number {
    //dateOrString2-dateOrString1
    const date1: Date = typeof dateOrString1 === 'string' ? new Date(dateOrString1) : dateOrString1;
    const date2: Date = typeof dateOrString2 === 'string' ? new Date(dateOrString2) : dateOrString2;

    const diffTimeMilliseconds = date2.getTime() - date1.getTime();
    const diffTimeSeocnds = diffTimeMilliseconds / 1000;
    const diffTimeMinute = diffTimeSeocnds / 60;
    const diffTimeHour = diffTimeMinute / 60;
    const diffDays = Math.ceil(diffTimeMilliseconds / 24);

    return diffTimeHour;
  }
  static postTime(dateOrString1: DateOrString, dateOrString2: DateOrString): Array<number> {
    //dateOrString2-dateOrString1
    const date1: Date = typeof dateOrString1 === 'string' ? new Date(dateOrString1) : dateOrString1;
    const date2: Date = typeof dateOrString2 === 'string' ? new Date(dateOrString2) : dateOrString2;

    const diffTimeMilliseconds = date2.getTime() - date1.getTime();
    const diffTimeSeocnds = diffTimeMilliseconds / 1000;
    const diffTimeMinute = Math.round(diffTimeSeocnds / 60);
    const diffTimeHour = Math.round(diffTimeMinute / 60);
    const diffDays = Math.ceil(diffTimeMilliseconds / 24);

    return [diffTimeMinute, diffTimeHour];
  }
  static subtract(dateOrString1: DateOrString, dateOrString2: DateOrString): number {
    //dateOrString2-dateOrString1
    const date1: Date = typeof dateOrString1 === 'string' ? new Date(dateOrString1) : dateOrString1;
    const date2: Date = typeof dateOrString2 === 'string' ? new Date(dateOrString2) : dateOrString2;

    return date2.getTime() - date1.getTime();
  }

  static getMinutes(dateOrString1: DateOrString): number {
    const date1: Date = typeof dateOrString1 === 'string' ? new Date(dateOrString1) : dateOrString1;
    const diffTimeMilliseconds = date1.getMilliseconds();
    const diffTimeSeocnds = diffTimeMilliseconds / 1000;
    const diffTimeMinute = diffTimeSeocnds / 60;
    return Math.round(diffTimeMinute);
  }
  static date(dateOrString1: DateOrString): Date {
    return typeof dateOrString1 === 'string' ? new Date(dateOrString1) : dateOrString1;
  }
}

export default DateUtil;
