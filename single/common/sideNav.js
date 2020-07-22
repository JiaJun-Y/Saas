window.onload = currentPath

$(function() {
  var AnalyticalDiagnosisPath = ''
  getPathUrl()

  $("#popLayer").click(function(e) {
    $("#popLayer").hide();
    $("#msg-pop").hide()
    $('#wx-code-box').hide()
    $('#plugIn').hide()
    $('#fileUploadContent').empty()
    $('#upload').hide()
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

function getPathUrl() {
  $.get('http://192.199.198.134:8005/ryservice/load_ry_app_list?token=NhGLmIwVe1l5%2FsS3VzM0ANyaV%2FnGAOmowD9Ac%2FfcnKiznWUJD%2Fxh5HpnYuDXwqyOZjQEyG20KO%2F5JH4seZVyvLXJOblussBySOplc0QvX2moZsUf8sOhFX7TQE1glDCzEym1AmVK8pSbIzL%2Fiu8mTHcj5XU1ekZN%2F717viDWB80%3D', function(res) {
    if (!res) return
    var _appList = res.AppList
    var _Holter = []
    _Holter = _.filter(_appList, function(o) {
      return o.AppDescription === 'Holter'
    })

    if (_Holter.length > 0 && _Holter[0].URL.length > 0) {
      AnalyticalDiagnosisPath = _Holter[0].URL
      console.log(AnalyticalDiagnosisPath)
    } else {
      console.log('a')
    }
  })
}

function currentPath() {
  var _href = window.location.href
  if (_href.indexOf('app') > -1) {
    $('#app').css({ 'color': '#fff', 'background': '#43b3be' })
    $('#app .img-box').css({ 'background': "url(' + ../../images/home.png') no-repeat", 'backgroundSize': '100% 100%' })
  } else if (_href.indexOf('book') > -1) {
    $('#book').css({ 'color': '#fff', 'background': '#43b3be' })
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

// 上传文件
function handleUpload() {
  $('#popLayer').show()
  $('#upload').show()
  initWithLayout()
}

// 布局
function initWithLayout() {
  var fileContanObj = $("#fileUploadContent");
  var btsStr = '';
  btsStr += '<div class="uploadBts">';
  btsStr += '<div>';
  btsStr += '<div class="saveFileBt" onclick="saveFileEvent()">' + '保存文件' + '</div>';
  btsStr += '<div class="selectFileBt" onclick="selectFileEvent()">' + '导入许可' + '</div>';
  btsStr += '</div>';
  btsStr += '</div>';
  fileContanObj.append(btsStr)
}

// 保存文件
function saveFileEvent() {
  disableFileUpload()
  downFileByIframe();

  setTimeout(function() {
    $('#fileUploadContent').empty()
    $('#popLayer').hide()
    $('#upload').hide()
  }, 800);
}

function downFileByIframe() {
  var haveIframe = $("#down-iframe");
  if (haveIframe) {
    haveIframe.remove();
  }
  var downloadURL = '/license/generate_req';
  var iframe = document.createElement("iframe");
  iframe.src = downloadURL;
  iframe.id = "down-iframe";
  iframe.style.display = "none";
  document.body.appendChild(iframe);
}

// 选择文件
function selectFileEvent() {
  var inputObj = document.createElement('input');
  inputObj.setAttribute('accept', '.fg')
  inputObj.setAttribute('id', 'fileUploadContent_file');
  inputObj.setAttribute('type', 'file');
  inputObj.setAttribute("style", 'visibility:hidden');

  $(inputObj).on("change", function() {
    uploadFile(this.files[0])
  });
  document.body.appendChild(inputObj);
  inputObj.click();
}

// 上传文件
function uploadFile(file) {
  disableFileUpload()
  var formData = new FormData();
  formData.append('file', file)

  console.log(formData)
  $.ajax({
    type: "post",
    url: 'http://192.199.198.134:8005/book/import_lic',
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function(data) {
      if (data.RepCode == 0) {
        layer.msg(data.RepMsg);
        setTimeout(function() {
          location.reload();
        }, 1000);
      } else {
        layer.msg(data.RepMsg);
        resetfileUpload();
      }

    },
    error: function(e) {
      layer.msg("网络错误");
      resetfileUpload();
    }
  });
}

// 禁用按钮
function disableFileUpload() {
  var selectFileBt = $(".selectFileBt");
  selectFileBt.css({
    "background-color": "#a0cfff",
    'cursor': 'not-allowed',
    "pointer-events": 'none'
  });

  var saveFileBt = $('.saveFileBt')
  saveFileBt.css({
    "background-color": "#a0cfff",
    'cursor': 'not-allowed',
    "pointer-events": 'none'
  });
}

// 启动按钮
function resetfileUpload() {
  var selectFileBt = $(".selectFileBt");
  selectFileBt.css({
    "background-color": "#0099FF",
    "cursor": "pointer",
    "pointer-events": "all"
  });

  var saveFileBt = $('.saveFileBt')
  saveFileBt.css({
    "background-color": "#0099FF",
    "cursor": "pointer",
    "pointer-events": "all"
  });
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

// 点击分析诊断
function analysisInterval() {
  var localStorage = window.localStorage
  var _t = 0
  if (localStorage.getItem('clickAnalysisTime')) {
    _t = compareTime()
    localStorage.setItem('clickAnalysisTime', moment().format("YYYY-MM-DD HH:mm:ss"))
  } else {
    var clickAnalysisTime = moment().format("YYYY-MM-DD HH:mm:ss");
    localStorage.setItem('clickAnalysisTime', clickAnalysisTime)
  }

  console.log(_t)
  return _t
}

// 比较时间
function compareTime() {
  var clickAnalysisTime = localStorage.getItem('clickAnalysisTime')
  var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  let diffTime = moment(currentTime).diff(clickAnalysisTime);
  return diffTime / 1000 // 单位秒
}