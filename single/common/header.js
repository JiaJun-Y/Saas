var c = 0;

function showTime() {
  document.getElementById('time').innerText = _currentTime()
}
setInterval("showTime()", "1000");

function _currentTime() {
  var now = new Date();
  var _month = (10 > (now.getMonth() + 1)) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  var _day = (10 > now.getDate()) ? '0' + now.getDate() : now.getDate();
  var _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
  var _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
  return now.getFullYear() + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute;
}