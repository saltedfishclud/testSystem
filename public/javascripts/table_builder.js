function table_builder(warp,subj,type) {
    var query_list = {
        javascript:{
            mcq:["ID","问题","选择项","展示代码","正确答案","解释","修改时间"],
            judge:["ID","问题","展示代码","答案","解释","修改时间"],
            multiple:["ID","问题","选择项","展示代码","答案","解释","修改时间"]
        }
    }
    if(warp.getElementsByTagName("table")[0]){
        warp.removeChild(warp.childNodes[0]);
    }

    var table = document.createElement("table"),
        thead = document.createElement("thead"),
        tr = document.createElement("tr");


    table.style.width = "100%";
    table.cellspacing = 1;
    table.className = "display";
    table.id = "textTable";

    warp.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(tr);


    query_list[subj][type].forEach(function (el,index) {
        var th = document.createElement("th");
        th.innerText = el;
        tr.appendChild(th);
    });
    tr.appendChild(document.createElement("th"));
}