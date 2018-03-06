function creates_form(warp,type) {

    warp.removeChild(warp.childNodes[0]);

    var form = document.createElement("form");

    form.action = "/v1_0/javascript/" + type;
    form.method = "post";

    var items = {
        "mcq":[{
            name:"question",
            show:"题目"
        },{
            name:"q_code",
            show:"试题代码",
            textArea:true
        },{
            name:"options",
            show:"选择项"
        },{
            name:"rightAnswer",
            show:"正确答案",
        },{
            name:"explain",
            show:"解释说明",
            textArea:true
        }],
        "multiple":[{
            name:"question",
            show:"题目"
        },{
            name:"q_code",
            show:"试题代码",
            textArea:true
        },{
            name:"options",
            show:"选择项"
        },{
            name:"rightAnswer",
            show:"正确答案",
        },{
            name:"explain",
            show:"解释说明",
            textArea:true
        }],
        "judge":[{
            name:"question",
            show:"题目"
        },{
            name:"q_code",
            show:"试题代码",
            textArea:true
        },{
            name:"result",
            show:"结果"
        },{
            name:"explain",
            show:"解释说明",
            textArea:true
        }]
    }

    items[type].forEach(function (el) {
        var item = document.createElement("div");
        item.className = "item";
        warp.appendChild(item);

        var p = document.createElement("p");
        p.innerText = el.show;
        item.appendChild(p);

        var input = el.textArea?document.createElement("textarea"):document.createElement("input");
        input.name = el.name;

        item.appendChild(input);

        form.appendChild(item);
    });

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.className = "q-submit";
    submit.value = "提交试题";

    form.appendChild(submit);

    warp.appendChild(form);
}