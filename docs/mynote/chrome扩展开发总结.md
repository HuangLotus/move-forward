### chrome扩展开发总结

### 问题背景
web sdk的chrome扩展开发完成后，别的部门不想要在network中发出307请求，所以修改技术实现方案。

### 技术方案
不做redirect而是做拦截。
直接修改浏览器原生的xmlHTTPRequest和Fetch API.

是这样的，我们现在是修改的浏览器原生的xmlHTTPRequest和fetch请求API，和崔倩的web sdk中修改ajax-hook中的钩子是一个原理。没有做307跳转了，也不会去修改协议头。我调研了现在Chrome做拦截的网上比较通用的就是这两种方法，一种是redirect，另外一种就是修改原生api。

没有说扩展里面自己去发出业务请求，这样做一层中转是没必要的，而且可能会存在隐患。

### 开发中遇到的细节问题总结
1. web_accessible_resources js(inject-script)文件如何获取消息：通过onMessage的方式

2. content-script可以修改web页面的localStorage,也可以获取
3. xmlhttp.js可以修改web页面的localStorage，也可以获取

参考cnblogs.com/liuxianan/p/chrome-plugin-develop.html


### content-script.js和inject-script.js的区别
#### content-script.js
和injected script相似，它也是被注入到用户当前浏览的页面中的。但区别在于，它不是真正完全融入网页上下文的，而是运行在一个单独的被隔离的环境中

#### inject-script.js
这种脚本，和原网页自带的脚本，就完全是一路货了

完全和网页原有的脚本文件一样，我称它为“不属于扩展程序的脚本”。
可以访问网页原有js的变量空间。

参考：https://blog.csdn.net/itpinpai/article/details/80363939

### background.js
　　这类脚本是运行在浏览器后台的，注意它是与当前浏览页面无关的。
　　所谓的后台脚本，在chrome扩展中又分为两类，分别运行于后台页面（background page）和事件页面（event page）中。两者区别在于，前者（后台页面）持续运行，生存周期和浏览器相同，即从打开浏览器到关闭浏览器期间，后台脚本一直在运行，一直占据着内存等系统资源；而后者（事件页面）只在需要活动时活动，在完全不活动的状态持续几秒后，chrome将会终止其运行，从而释放其占据的系统资源，而在再次有事件需要后台脚本来处理时，重新载入它。这两类咋区分呢？通过你在manifest中的声明：

manifest.json
```json
"background": {
    "scripts": ["background.js"],
    "persistent": false
}
```
这里persistent的值默认是true，此时这个js就是运行在后台页面的（持续的）；若这个值为false，那就是事件页面（非持续的）了。

### 各类脚本之间的通信
chrome扩展中的通信可以有这么几类：content script和“完全属于扩展程序的脚本”之间的通信、injected script和content script之间的通信、“完全属于扩展程序的脚本”们互相之间的通信、扩展程序的脚本和外部服务器之间的通信

### 通信细节总结说明
| 脚本              | 概述                                                         | 作用范围                                                     | 运行环境               | 通信                    | 备注                   |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------------- | :---------------------- | :--------------------- |
| popup.js          | 在用户点击扩展程序图标时运行，它会在每次popup页面弹出时重新载入 | 它们不仅可以访问普通网页API、可以发起跨域xhr请求，而且可以访问chrome为扩展程序专门提供的API（即chrome.*）中的全部，“完全属于扩展程序的脚本”之间是可以互相访问的 | chrome扩展程序里面     |                         | 完全属于扩展程序的脚本 |
| background.js     | 这类脚本是运行在浏览器后台的，注意它是与当前浏览页面无关的   | chrome扩展程序里面                                           | 完全属于扩展程序的脚本 |                         |                        |
| content-script.js | 和injected script相似，它也是被注入到用户当前浏览的页面中的。但区别在于，它不是真正完全融入网页上下文的，而是运行在一个单独的被隔离的环境中 | 网页通用的API，跨域xhr请求，以及chrome为扩展程序提供的API中的一部分，具体有：（开头都是chrome.） 　* extension（getURL、inIncognitoContext、lastError、onRequest、sendRequest）; 　* i18n; 　* runtime（connect、getManifest、getURL、id、onConnect、onMessage、sendMessage）; 　* storage它不运行在网页的真正上下文中，因而只能访问和操纵页面DOM，但访问不到页面里js的变量空间（当然也访问不到页面里js定义的函数们） | web页面所在的浏览器    | 半属于扩展程序的脚本    |                        |
| injected.js       | 这种脚本和原网页自带的脚本，就完全是一路货                   | 只有网页通用的API是可用的，而chrome为扩展提供的API（chrome.*），这种完全注入到用户浏览的页面中的脚本都不能访问 | web页面所在的浏览器    | 和CS通过postMessage通信 | 不属于扩展程序的脚本   |

### 开发心得体会
最开始确定chrome扩展的拦截方案时选择了看似比较容易的redirectURL方案，但其实这个决定给后面的开发&调试带来了隐患。后面遇到的阻塞比较久的跨域就是因为redirectURL带来的，还无法很好的解决。
其实一开始如果就选择和web SDK一样的方案就没这么多问题了，折腾了一圈就又换回了第一种方案，不过这个过程收获了宝贵的采坑经验，也算是实践的价值。
调研了chrome扩展其他人拦截方案的实现方式，基本上都是去修改xmlHTTPRequest和fetch API;
调研业界的最佳实践
#### 1.ajax interceptor扩展

https://github.com/YGYOOO/ajax-interceptor/blob/master/README-zh.md

该插件只会在JS层面上对返回结果进行修改，即只会修改全局的XMLHTTPRequest对象和fetch方法里的返回值，进而影响页面展现。而你在chrome的devtools的network里看到的请求返回结果不会有任何变化.

页面加载时往页面上注入 js 代码，这段 js 会生成一个 XMLHttpRequest 的代理对象，并把 window.XMLHttpRequest 替换成这个对象。该对象又会对 onreadystatechange 和 onload 两个回调函数做特殊处理，在它们执行时把 responseText 和 response 的值覆盖为你设置的值（不过这两个值不是writeable的，要单独处理下）

#### 2.Fiddler&Charles

Fiddler 和 Charles 是常见的 HTTP 调试器，它们会在本地运行一个代理服务器，可以查看浏览器或其它客户端软件通过这个代理发起的请求和服务器的响应，也可以在请求提交到服务器之前和服务器返回响应之后设置断点，手工修改请求、响应的内容。另外，两个软件都可以以“中间人攻击”的形式，解密 HTTPS 通信

### 参考资料
https://zhuanlan.zhihu.com/p/24189002
https://stackoverflow.com/questions/18310484/modify-http-responses-from-a-chrome-extension/18316107#18316107
https://github.com/YGYOOO/ajax-interceptor