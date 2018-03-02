var table = $('#textTable').DataTable({
    "ordering": false,
    "language": {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
            "sJump": "跳转"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    },
    "ajax": {
        "url":"/v1_0/javascript/mcq",
        "dataSrc": ""
    },
    "autoWidth": false,
    "columnDefs": [
        {"width": "10%", "targets": 0},
        {"width": "15%", "targets": 1},
        {"width": "15%", "targets": 2},
        {"width": "15%", "targets": 3},
        {"width": "10%", "targets": 4},
        {"width": "15%", "targets": 5},
        {"width": "10%", "targets": 6},
        {"width": "5%", "targets": 7,
            render:function (data,type,row,meta) {
                return '<input type="checkbox" name="checkList" value="' + row.id + '"  id="checkall"/>'
            }
        }
    ],
    stripeClasses: ["odd", "even"],
    "columns": [
        {"data": "_id"},
        {"data": "question"},
        {"data": "options"},
        {"data": "q_code"},
        {"data": "rightAnswer",className:"text-center"},
        {"data": "explain"},
        {"data": "modified"},
        {
            data: null,
            title: "<input type='checkbox' name='checklist' id='checkall'/>",
            className:"text-center"
        }
    ],
});
$('#textTable tbody').on('click', 'tr input[name="checkList"]', function () {
    var tr = $(this).parents(tr);
    if (!$(this).prop("checked")) {
        tr.removeClass('selected');
    }
    else {
        tr.addClass('selected');
    }
});
$("#checkall").on('click',function () {
    if ($(this).prop("checked")) {
        $("input[name='checkList']").prop("checked", $(this).prop("checked"));
        $('#textTable tbody tr').addClass('selected');
    } else {
        $("input[name='checkList']").prop("checked", false);
        $('#textTable tbody tr').removeClass('selected');
    }
});

$(".q-del").click(function () {
    if(!$(".selected").length){
        return alert("没有数据");
    }
    var rel = confirm("确认删除所选条目？");
    if(rel){
        var idArr = [];
        $("tr.selected").each(function () {
            var id = $(this).find('td').eq(0).html();
            idArr.push(id);
        });
        idArr.forEach(function (id) {
            $.ajax({
                Async:false,
                type: "delete",
                url: '/v1_0/javascript/mcq/' + id
            });
        });
        table.ajax.reload();
    }
});