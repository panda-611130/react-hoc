### React-Hoc

业务场景：

![组件](/Users/zhengfan/Desktop/coooode/react-hoc/组件.jpg)

基本数据搜集组件 A B C D E  每个组件里面可以包含任意多个的Antd 表单控件。

我们可以 从 A B C D E 选择任何组件拼装成为一个页面 进行数据的搜集（目前拼装的组件页面顺序无序，而且只有input，主要是因为我使用对象数据结构保存schema）。

目前ABCDEF 只有Input。但是每Ï个组件都可以无限扩充内部基础FormItem表单项

最终搜集的数据结构:

```javascript
{
	A:{
     dataA1:"顶针"，
     dataA2:"树森"，
     //....
    }
  B:{
     dataB1:"庞德"，
     dataB2:"虞中合"，
     //....
    }
  //.....
}
```

数据详情也就是展示页面没完成。实际在每个组件的index.js render 中根据路由进行策略匹配就可以，工头喊我搬砖没空写了。

