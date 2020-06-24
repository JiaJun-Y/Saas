function serializeForm(formId) {
  var elements = getElements(formId);
  var queryComponents = new Array();

  for (var i = 0; i < elements.length; i++) {
    var queryComponent = serializeElement(elements[i]);
    if (queryComponent)
      queryComponents.push(queryComponent);
  }

  return queryComponents.join('&');
}

//获取指定form中的所有的<input> <select>对象  
function getElements(formId) {
  var form = document.getElementById(formId);
  var elements = new Array();
  var _elements = new Array();
  var _tagInputs = form.getElementsByTagName('input');
  var _tagSelects = form.getElementsByTagName('select');
  for (var j = 0; j < _tagInputs.length; j++) {
    elements.push(_tagInputs[j]);
  }

  for (var i = 0; i < _tagSelects.length; i++) {
    _elements.push(_tagSelects[i]);
  }

  return elements.concat(_elements);
}

//获取单个input中的【name,value】数组 
function inputSelector(element) {
  if (element.checked)
    return [element.name, element.value];
}

function input(element) {
  switch (element.type.toLowerCase()) {
    case 'submit':
    case 'hidden':
    case 'password':
    case 'text':
      return [element.name, element.value];
    case 'checkbox':
    case 'radio':
      return inputSelector(element);
  }
  return false
}

function handleSelectParams(element) {
  var index = element.selectedIndex;
  console.log(element.options)
  if (index >= 0) {
    var _value = element.options[index].value
    console.log(element.name, _value)
    return [element.name, _value];
  } else {
    return
  }
}

//组合URL 
function serializeElement(element) {
  var method = element.tagName.toLowerCase();
  var parameter = input(element) ? input(element) : handleSelectParams(element);

  if (parameter) {
    var key = parameter[0];
    if (key.length == 0) return;

    if (parameter[1].constructor != Array)
      parameter[1] = [parameter[1]];

    var values = parameter[1];
    var results = [];
    for (var i = 0; i < values.length; i++) {
      results.push(key + '=' + values[i]);
    }
    return results.join('&');
  }
}

// 清空input框
function resetForm(formId, cannotResetName) {
  var forms = document.getElementById(formId)
  var _tagInputs = forms.getElementsByTagName('input');
  var _tagSelects = forms.getElementsByTagName('select')
  var _textArea = forms.getElementsByTagName('textarea')

  for (var j = 0; j < _tagInputs.length; j++) {
    if (_tagInputs[j].name !== cannotResetName) {
      _tagInputs[j].value = ''
    }
  }

  for (var i = 0; i < _tagSelects.length; i++) {
    _tagSelects[i][0].selected = true
  }

  for (var k = 0; k < _textArea.length; k++) {
    _textArea[k].value = ''
  }
}


function cashFormat(val) {
  var _val = ''
  switch (val) {
    case '0':
      _val = '无'
      break;
    case '1':
      _val = '押金'
      break;
    case '2':
      _val = '证件'
      break;
  }

  return _val
}

function statusFormat(val) {
  var _val = ''
  switch (val) {
    case '-1':
      _val = '已取消'
      break;
    case '0':
      _val = '已作废'
      break;
    case '1':
      _val = '已预约'
      break;
    case '2':
      _val = '已戴机'
      break;
    case '3':
      _val = '已录入'
      break;
    case '4':
      _val = '已审核'
      break;
    case '5':
      _val = '已打印'
      break;
  }

  return _val
}

function genderFormat(val) {
  return val == 0 ? '男' : '女'
}


//显示Loading
var _LoadingHtml = '<div id="loadingDiv"><div id="over"></div><div id="layout"><img src="/ui/images/loading.png" /></div></div>';
//呈现loading效果
document.write(_LoadingHtml);

//移除loading效果
function completeLoading() {
  document.getElementById("loadingDiv").style.display = "none";
}
//展示loading效果
function showLoading() {
  document.getElementById("loadingDiv").style.display = "block";
}

// 打开设置弹框
function handleConfig() {
  $('#popLayer').show()
  $('#config-pop').show()
}