### 什么是HMR
修改代码后，webpack重新打包，并将打包后的文件发送给浏览器，并替换浏览器的bundle,实现不刷新即可更新页面；

### webpack中热更新插件的实现步骤
本质是利用Websocket服务器实现客户端代码和服务端代码的双向通信；

#### 看源码实现的大致步骤：
1. webpack-dev-server插件会在webpack的入口文件中添加两个文件，这两个文件会会打包到到最后的客户端的bundle中；
2. 在webpack-dev-server的server部分会创建一个服务器，监听文件的变化如果有变化重新编译；
3. 编译完成后会emit一个事件，客户端监听到这个事件，就触发重新render；
4. 从而实现了浏览器无刷新的更新；

这个插件结合了webpack编译过程，在编译过程中插入自己的逻辑代码；

如果不用webpack的插件，其实也可以自己利用webSocket实现浏览器的自动刷新更新页面，思路和上面的大同小异；

### 需要刷新浏览器的自动热更新
#### 服务端（node.js侧）代码
1. 创建一个服务器，并创建一个socket连接
```
const http = require("http");
const socket = require('socket.io');
let refreshSocket = null;

const refreshSocketServer = require('http').createServer()
let io = socket(reloadSocketServer) // websocket协议的握手需要http服务器
// 服务器需要监控客户端的连接，当客户端连接上来后，socket代表跟这个客户端连接的对象
io.on('connect', socket => {
  refreshSocket = socket;
});
// 断开链接的时候
io.on('disconnect', (socket) => {
  refreshSocket = null;
});
reFreshSocketServer.listen(3000);
```
2. 监听client打包文件
```
chokidar.watch([
  '/xx',
], {
    ignoreInitial: true
}).on('all', (event, path) => {
    refreshSocket.emit('reload'); // 通知客户端socket更新
});
```
#### 客户端代码
```
import io from "socket.io-client";
const socket = io('127.0.0.1:3000/');// 连接服务端
  socket.on('reload', () => {
    window.location.reload();
  })
```
这样就实现了一个简单的浏览器自动刷新效果。
