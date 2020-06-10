var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scaleNum = 1;
scale = 1;
var Page = [];
var renderContext;
var count = 0;
var fragment = document.createDocumentFragment();
var canvasList = document.getElementById('canvas_list');

var activeService = null
var overlayManager = null


function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(scale);
    console.log(viewport)
    var CSS_UNITS = 300 / 72.0
    var canvas = document.createElement('canvas');
    var hr = document.createElement('hr');
    canvas.classList.add('pageitem');
    canvas.style.display = 'flex';
    canvas.style.margin = '0 auto';

    hr.style.margin = '20px 0';
    hr.style.border = 'none';

    console.log(canvas)
    canvasList.appendChild(canvas);
    canvasList.appendChild(hr);

    const ctx = canvas.getContext('2d')

    canvas.height = viewport.height * CSS_UNITS;
    canvas.width = viewport.width * CSS_UNITS;

    canvas.style.width = 210 + 'mm';
    canvas.style.height = 297 + 'mm';

    ctx.save()
    ctx.restore()
    renderContext = {
      transform: [CSS_UNITS, 0, 0, CSS_UNITS, 0, 0],
      canvasContext: ctx,
      viewport: viewport,
    };
    if (num === 1) { Page.push(page) }
    page.render(renderContext).promise.then(function() {
      count++;
      if (count === pdfDoc.numPages) {
        window.print();
        $('#PDF').hide()
        $('#canvas_list canvas').remove();
        count = 0
      }
    });
  })
}

//打印
$(".printClick").on("click", function() {
  window.print();
})

//加减
$('.reduceNum').on("click", throttle(function() {
  if (parseInt($('.Num')[0].innerHTML) >= 20) {
    scaleNum = scaleNum - 0.1;
    scale = 1.5 * scaleNum;
    $('.Num')[0].innerHTML = parseInt(scale / 1.5 * 100) + '%';
    for (var i = 0; i < $('.pageitem').length; i++) {
      $('.pageitem')[i].style.width = viewport.width * scaleNum + 'px';
      $('.pageitem')[i].style.height = viewport.height * scaleNum + 'px';
    }
  }
}));

$('.addNum').on("click", throttle(function() {
  if (parseInt($('.Num')[0].innerHTML) <= 160) {
    scaleNum = scaleNum + 0.1;
    scale = 1.5 * scaleNum;
    $('.Num')[0].innerHTML = parseInt(scale / 1.5 * 100) + '%';
    // 直接改变样式的话 失帧
    for (var i = 0; i < $('.pageitem').length; i++) {
      console.log(viewport.width * scaleNum)
        // 直接修改canvas的宽高不会渲染 
      $('.pageitem')[i].style.width = viewport.width * scaleNum + 'px';
      $('.pageitem')[i].style.height = viewport.height * scaleNum + 'px';
    }
  }
}));

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

//节流
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function() {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) { return; }
    // 立即设置为false   
    canRun = false;
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(function() {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments);
      canRun = true;
    }, 10);
  }
}