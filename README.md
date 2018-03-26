# tanzhouEDU testSystem test version

潭州教育学员考试系统测试版本正式上线[test.wulv5.com](test.wulv5.com)，该版本为对接移动端PWA项目开发接口服务，后台

管理系统已经完成试题增删改查基本操作，学生考试系统目前正在架构中。


### 开放页面

> [考试系统首页](test.wulv5.com)
[管理员登陆界面](test.wulv5.com/admin/login)
[管理员管理界面 ](test.wulv5.com/admin/view)



### 开放接口
接口采用RESTful风格架构，可对选题提供增删改查的基本动作。
目前开放JS选择题、多选题、简答题、编程题以及判断题，拥有增（POST），查（GET），删（DELETE）动作。
JS题库接口：[/javascript/:$type](http://test.wulv5.com/api/v1_0)

访问接口必须提供身份验证，管理员身份登陆即可获取接口所有操作权限。学生用户必须通过`身份验证`,获取`ticket`才能允许访问所有题库接口，而且只有查询功能，没有其他操作权限

###接口文档

#### [version 1.0](http://test.wulv5.com/api/v1_0)
项目源码因涉及核心业务代码，后续不会再往库中推送源代码。系统版本更新见README.md
