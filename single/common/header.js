var c = 0;

function showTime() {
  document.getElementById('time').innerText = _currentTime()
}
setInterval("showTime()", "1000");

function _currentTime() {
  var date = moment().format("YYYY/MM/DD HH:mm")
  var week = moment(date).day();
  return date + '    ' + ' 星期' + DX(week)
}

function DX(n) {
  switch (n) {
    case 3:
      return '三'
      break;
    default:
      //  默认代码块
  }
}