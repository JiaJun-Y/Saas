window.onload = currentPath

$(function() {
  $("#popLayer").click(function(e) {
    $("#popLayer").hide();
    $("#msg-pop").hide()
    $('#wx-code-box').hide()
    $('#plugIn').hide()
    e.stopPropagation();
  })

  $("#close").click(function(e) {
    $("#popLayer").hide();
    $('#wx-code-box').hide()
    e.stopPropagation();
  })

  $('#closeMsgPop').click(function(e) {
    $("#popLayer").hide();
    $("#msg-pop").hide();
    e.stopPropagation();
  })

  $('#setting').click(function(e) {
    $('.config-wapper').show()
    e.stopPropagation();
  })

  $('body').click(function(e) {
    $('.config-wapper').hide()
    e.stopPropagation();
  })
})

function currentPath() {
  var _href = window.location.href
  if (_href.indexOf('app') > -1) {
    $('#app').css({ 'color': '#4dbdc8' })
    $('#app .img-box').css({ 'background': "url(' + ../../images/home.png') no-repeat", 'backgroundSize': '100% 100%' })
  } else if (_href.indexOf('book') > -1) {
    $('#book').css({ 'color': '#4dbdc8' })
    $('#book .img-box').css({ 'background': "url(' + ../../images/side-check-light.png') no-repeat", 'backgroundSize': '100% 100%' })
  }
}

function jump(a) {
  var _href = window.location.href
  var _currentNav = $(a).attr('id')
  if (_href.indexOf(_currentNav) > -1) {
    return
  } else {
    switch ($(a).attr('id')) {
      case 'app':
        //  代码块
        window.open('/single/app.html', '_self')
        break;
      case 'analysis':
        window.open('/single/analysis.html', '_blank')
        break;
      case 'book':
        //  代码块
        if (AnalyticalDiagnosisPath && AnalyticalDiagnosisPath.length > 0) {
          window.open(AnalyticalDiagnosisPath, '_self')
        } else {
          window.open('/single/book.html', '_self')
        }
        break;
      default:
        //  默认代码块
    }
  }
}

function help() {
  $('#popLayer').show()
  $('#wx-code-box').show()
}

function changeMsg() {
  $('#popLayer').show()
  $('#msg-pop').show()
}

function downPlug() {
  console.log('插件下载')
  $('#popLayer').show()
  $('#plugIn').show()
}

// 获取用户修改信息
function getPopMsg() {
  var name = $('input[name="name"]').val();
  var gender = $('select[name="gender"]').val();
  var oldPwd = $('input[name="oldPwd"]').val();
  var newPwd = $('input[name="newPwd"]').val();
  var confirmPwd = $('input[name="confirmPwd"]').val();

  if (!name) {
    layer.msg("请输入姓名", { time: 1000, icon: 2 });
    return false;
  }
  if (newPwd || oldPwd || confirmPwd) {
    if (!oldPwd) {
      layer.msg("请输入旧密码", { time: 1000, icon: 2 });
      return false;
    }
    if (!newPwd) {
      layer.msg("请输入新密码", { time: 1000, icon: 2 });
      return false;
    }
    if (newPwd.length < 6) {
      layer.msg("密码不能少于6位", { time: 1000, icon: 2 });
      return false;
    }
    if (!confirmPwd) {
      layer.msg("请再次输入新密码", { time: 1000, icon: 2 });
      return false;
    }
    if (hex_md5(newPwd) != hex_md5(confirmPwd)) {
      layer.msg("2次输入的密码不一致", { time: 1000, icon: 2 });
      return false;
    }
    oldPwd = hex_md5(oldPwd);
    newPwd = hex_md5(newPwd);
  } else {
    oldPwd = "";
    newPwd = "";
  }
  $('#popLayer').hide()
  $('#msg-pop').hide()
  $.post("/app/editAccount", { oldPwd: oldPwd, newPwd: newPwd, name: name, gender: gender }, function(data) {
    if (data.code == 1) {
      $('.rePwd').css('display', 'none');
      $('.mask').css('display', 'none');
      layer.msg("修改信息成功，请重新登录", { time: 1500, icon: 1 });
      setTimeout(function() {
        window.location.href = '/';
      }, 1500);

    } else {
      layer.msg(data.msg, { time: 1000, icon: 2 });
      return false;
    }
  });

}