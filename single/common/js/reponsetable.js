(function(e) {
  e.fn.reponsetable = function(obj) {
    var tableid = $(this).attr("id");
    reponse.rendertable(obj, tableid);
    // var tr = $(this).find("tr");
    $("tr").click(function(e) {
      var dd = reponse.resiverowdata(this, tableid);
    })
  }
  var reponse = {
    //加载表格
    rendertable: function(tableobj, tableid) {
      var thead = "<thead><tr>";
      var tbody = "<tbody>";
      for (var i = 0; i < tableobj.colum.length; i++) {
        if (tableobj.colum[i].title) {
          var th = '<th data-field="' + tableobj.colum[i].field + '" class="' + tableobj.colum[i].field + '">' + tableobj.colum[i].title + '</th>';
          thead += th;
        }
      }
      if (tableobj.operation !== "" || tableobj != null) {
        thead += '<th data-field="' + tableobj.operation + '" class="' + tableobj.operation + '">操作</th>'
      }
      thead += '</tr></thead>';
      for (var i = 0; i < tableobj.data.length; i++) {
        tbody += '<tr>'
        for (var j = 0; j < tableobj.colum.length; j++) {
          // if (tableobj.colum[j].title) {
          var field = tableobj.colum[j].field;
          var datath = tableobj.colum[j].title;
          var content = tableobj.data[i][field];
          if (content == undefined) content = "";
          if (tableobj.colum[j].title) {
            if (tableobj.colum[j].title === '担保方式') {
              content = cashFormat(content)
            }

            if (tableobj.colum[j].title === '状态') {
              content = statusFormat(content)
            }

            if (tableobj.colum[j].title === '性别') {
              content = genderFormat(content)
            }
			content = content === '0000-00-00 00:00:00' ? '' : content
            var td = '<td data-field="' + field + '" data-th="' + datath + '"  class="' + field + '">' + content + '</td>';
            tbody += td;
          } else {
            var td = '<td data-field="' + field + '" data-th="' + datath + '"  class="' + field + '" style=\"display: none;\">' + content + '</td>';
            tbody += td;
          }
        }
        if (tableobj.operation !== "" || tableobj != null) {
          var editor = $("#" + tableobj.operation).html();
		  //console.log(editor)
          tbody += '<td data-th="操作" class="' + tableobj.operation + ' ' + tableobj.data[i].Status + '-data-status' + '" data-index="' + i + '" data-id="' + tableobj.data[i].ID + '"';
		  tbody += ' data-status="' + tableobj.data[i].Status + '"';
		  tbody += ' data-ruid="' + tableobj.data[i].RUID + '"';
		  tbody += ' data-examuid="' + tableobj.data[i].ExamUID + '"';
		  tbody += '>' + editor + '</td>';
		  
        }
        tbody += '</tr>'
      }
      tbody += "</tbody>"
      $("#" + tableid).prepend(thead);
      $("#" + tableid).append(tbody);
      //存table对象
      var tbodytr = $("#" + tableid).find("tbody tr");
      var data = [];
      for (var i = 0; i < tbodytr.length; i++) {
        var tbodytd = $(tbodytr[i]).find("td");
        var colobj = {};
        for (var j = 0; j < tbodytd.length; j++) {
          var field = $(tbodytd[j]).attr("data-field");
          var text = $(tbodytd[j]).text();
          if (field != undefined) {
            colobj[field] = text;
          }
        }
        data.push(colobj);
      }
      tableobj.data = data;
      $("#" + tableid).data('tableObj', tableobj);
    },

    //   //获取单机行编辑行的数据
    resiverowdata: function(row, tableid, e) {
      var idno = $(row).parent().is("thead");
      if (!idno) {
        $(row).addClass("yesbei").siblings().removeClass("yesbei");
      }
      var td = $(row).find("td");
      var data = {};
      for (var i = 0; i < td.length; i++) {
        field = $(td[i]).attr("data-field");
        content = $(td[i]).text();
        if (field != undefined) {
          data[field] = content;
        }
        // data[field] = content;
      };
      var row = $("#" + tableid).data("row", row);
      var rowdata = $("#" + tableid).data("rowdata", data);
      return data;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
    },
  }
  window.reponse = reponse;
}(jQuery));

// function goPage(pno, psize, count, totalPage) {
//   console.log(pno)
//   var itable = document.getElementById("table");
//   var num = count; // 表格所有行数(所有记录数)
//   console.log(num)
//   var totalPage = totalPage; // 总页数
//   var pageSize = psize; // 每页显示行数
//   $('table tbody').scrollTop(0)

//   //  总共分几页 
//   if (num / pageSize > parseInt(num / pageSize)) {
//     totalPage = parseInt(num / pageSize) + 1;
//   } else {
//     totalPage = parseInt(num / pageSize);
//   }

//   var currentPage = pno; // 当前页数
//   var startRow = (currentPage - 1) * pageSize + 1;
//   var endRow = currentPage * pageSize;
//   endRow = (endRow > num) ? num : endRow;

//   // 遍历显示数据实现分页
//   for (var i = 1; i < (num + 1); i++) {
//     var irow = itable.rows[i];
//     if (i >= startRow && i <= endRow) {
//       irow.style.display = "";
//     } else {
//       irow.style.display = "none";
//     }
//   }

//   $("#page_bottom").paging({
//     pageNo: pno,
//     totalPage: totalPage,
//     totalSize: num,
//     callback: function(num) {
//       goPage(num, psize, count, totalPage)
//     }
//   })
// }


// function goPage(pno, psize, count, totalPage) {
//   console.log(pno)
//     // var itable = document.getElementById("table");
//   var num = count; // 表格所有行数(所有记录数)
//   // console.log(num)
//   var totalPage = totalPage; // 总页数
//   var pageSize = psize; // 每页显示行数
//   $('table tbody').scrollTop(0)

//   //  总共分几页 
//   if (num / pageSize > parseInt(num / pageSize)) {
//     totalPage = parseInt(num / pageSize) + 1;
//   } else {
//     totalPage = parseInt(num / pageSize);
//   }

//   var currentPage = pno; // 当前页数
//   var startRow = (currentPage - 1) * pageSize + 1;
//   var endRow = currentPage * pageSize;
//   console.log(startRow, endRow, num)
//   endRow = (endRow > num) ? num : endRow;

//   // // 遍历显示数据实现分页
//   // for (var i = 1; i < (num + 1); i++) {
//   //   var irow = itable.rows[i];
//   //   if (i >= startRow && i <= endRow) {
//   //     // irow.style.display = "";
//   //   } else {
//   //     // irow.style.display = "none";
//   //   }
//   // }

//   $("#page_bottom").paging({
//     pageNo: pno,
//     totalPage: totalPage,
//     totalSize: count,
//     callback: function(num) {
//       goPage(num, psize, count, totalPage)
//     }
//   })
// }