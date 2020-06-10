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
  var _value = element.options[index].value
  return [element.name, _value];
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
      _val = '已佩戴'
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
  console.log('b')
  document.getElementById("loadingDiv").style.display = "none";
}
//展示loading效果
function showLoading() {
  console.log('a')
  document.getElementById("loadingDiv").style.display = "block";
}

// //播放提示音 5-19
// function play(){
//   console.log('播放音乐')
//   //IE9+,Firefox,Chrome均支持<audio/> 
//     $('#newMessage').html('<audio autoplay="autoplay" id="audio"><source src="./11.wav"' 
//     + 'type="audio/wav"/><source src="./11.wav" type="audio/mpeg"/></audio>');
// }

function initPieEchect(_id, oldData) {
  var _postition = 'inner'
  var myIstPie = echarts.init(document.getElementById(_id))
  var oldData = oldData
  var typeArr = []
  var dataset = []
  oldData.forEach(function(item) {
    if (typeArr.indexOf(item.CURRENCY_TYPE) < 0) {
      typeArr.push(item.CURRENCY_TYPE);
    }
  });
  dataset = typeArr.map(function(CURRENCY_TYPE) {
    return {
      name: CURRENCY_TYPE,
      value: ''
    };
  });
  for (var i = 0; i < dataset.length; i++) {
    for (var j = 0; j < oldData.length; j++) {
      var _isZero = _.every(oldData, function(val) {
        return val.AMOUNT === 0
      })

      if (dataset[i].name == oldData[j].CURRENCY_TYPE) {
        if (_isZero) {
          dataset[i].value = oldData[j].AMOUNT
        } else {
          dataset[i].value = oldData[j].AMOUNT === 0 ? '' : oldData[j].AMOUNT;
        }
      }
    }
  }

  _.find(dataset, function(val, index) {
    if (!_isZero) {
      if (dataset[0].value == 0 || dataset[1].value == 0) {
        return _postition = 'center'
      } else {
        return _postition = 'inner'
      }
    }
  })

  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: dataset,
      label: {
        position: _postition,
        formatter: function(data) {
          return data.value
        },
        color: '#000',
        fontSize: 14,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        }
      },
      itemStyle: {
        normal: {
          color: function(params) {
            var colorList = ['#4dbdc8', '#d6dadd']
            return colorList[params.dataIndex]
          }
        }
      }
    }]
  };
  myIstPie.setOption(option);
}

// // 去除括号
// function removeBlock(str) {
//   if (str) {
//     str = str.replace(/\{/g, '');
//     str = str.replace(/\}/g, '');
//     return str
//   }
// }

// 打开设置弹框
function handleConfig() {
  $('#popLayer').show()
  $('#config-pop').show()
}