var c = 0;

function showTime() {
  document.getElementById('time').innerText = _currentTime()
}
setInterval("showTime()", "1000");

function _currentTime() {
  var date = moment().format("YYYY/MM/DD")
  var _time = moment().format("HH:mm")
  var week = moment(new Date(date)).day();
  return date + '\xa0\xa0' + _time + '\xa0\xa0' + ' 星期' + DX(week)
}

function DX(n) {
  switch (n) {
    case 0:
      return '日'
      break;
    case 1:
      return '一'
      break;
    case 2:
      return '二'
      break;
    case 3:
      return '三'
      break;
    case 4:
      return '四'
      break;
    case 5:
      return '五'
      break;
    case 6:
      return '六'
      break;
    case 7:
      return '日'
      break;
    default:
  }
}