import { Buffer } from 'buffer';
import { Dimensions, Platform, PixelRatio, PushNotificationIOS } from 'react-native';
import SendSMS from 'react-native-sms'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


export const base64ToHex = (value) => new Buffer(value, 'base64').toString('hex')
export const getDecValue = (c) => {
  const originHex = base64ToHex(c.value);
  let value = parseInt(originHex, 16)
  if((value & 0x8000) >> 15 == 1){
    value = value & 0xffff;
    value = value - 0x10000;
  }

  return value
}

export const getToday = () => {
  var date = new Date(); 
  var year = date.getFullYear(); 
  var month = new String(date.getMonth()+1); 
  var day = new String(date.getDate()); 

  // 한자리수일 경우 0을 채워준다. 
  if(month.length == 1){ 
    month = "0" + month; 
  } 
  if(day.length == 1){ 
    day = "0" + day; 
  } 

  return year + "-" + month + "-" + day;
}

export const getTimeForNow = () => {
  let date = new Date();
  var year = date.getFullYear(); 
  var month = new String(date.getMonth()+1); 
  var day = new String(date.getDate()); 
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  // 한자리수일 경우 0을 채워준다. 
  if(month.length == 1){ 
    month = "0" + month; 
  } 
  if(day.length == 1){ 
    day = "0" + day; 
  } 
  
  m = this._checkTime(m);
  s = this._checkTime(s);

  const now = `${year}.${month}.${day} ${h}:${m}:${s}`

  return now
}

export const getTimeForNowPath = (t) => {
  let time = t
  
  const year = time.substring(0,4)
  const month = time.substring(5,7)
  const day = time.substring(8,10)

  time = time.substring(11)

  const hour = time.substring(0,2)
  const minute = time.substring(3,5)
  const second = time.substring(6,8)

  const now = `${year}.${month}.${day}_${hour}:${minute}:${second}`
  return now
}

_checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}

export const send = (message, contacts) => {
 
  SendSMS.send({
      body: message,
      recipients: contacts,
  }, (completed, cancelled, error) => {

      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  });
}

export const notification = () => {
  PushNotificationIOS.scheduleLocalNotification({ 
    fireDate: new Date(Date.now() + 60 * 1000).getTime(), 
    alertTitle: '위험상황 감지!',
    alertBody: '부정맥으로 의심되는 신호가 감지되었습니다!'
  });
}

export const signalToString = (data) => {
  let signalString = ''
  for(i in data){
    signalString += `${data[i]}\n`
  }

  return signalString
}

export const stringToSignal = (data) => {
  var signal = data.split('\n').map((item) => {
    return parseInt(item, 10);
  });

  return signal.slice(0,-1)
}