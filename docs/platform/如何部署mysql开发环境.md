### 如何部署mysql环境
#### 主要分以下几个步骤：
1. 先安装mysql数据库，下载地址：https://dev.mysql.com/downloads/mysql/，（还可以下载mysql的GUI图形工具 http://www.mysql.com/downloads/workbench/）
2. 启动mysql数据库；
3. 代码里直接连接数据库；
4. 连接数据后，就可以直接对数据做增删改查了。

### 安装好mysql数据库后的设置
这里主要介绍mac下的部署过程。

1. 将mysql的命令添加到系统中
    - 进入/usr/local/mysql/bin,查看此目录下是否有mysql
    - 执行vim ~/.bash_profile，如果用了zsh就执行vim ~/.zshrc
    - 在该文件中添加mysql/bin的目录
    ```bash
    PATH=$PATH:/usr/local/mysql/bin
    ```
    如果是zsh,就是在文件底部添加这么一行：
    ```bash
    export PATH=/usr/local/mysql/bin:$PATH
    ```
    添加完成后，然后输入wq保存
    - 最后在命令行输入source ~/.bash_profile或source ~/.zshrc，确保执行到位；

2. 登录mysql：
```bash
mysql -u root -p
```
3. 输入之前的安装mysql时输入的密码,比如我的是：
```bash
didi2020
```
这里的密码是在安装mysql的时候输入的；

4. 然后输入：
```bash
alter user 'root'@'localhost' identified with mysql_native_password by '123456'
```
这里的123456是我设置的root用户的密码；

5. 再输入
```bash
flush privileges
```
6. 用本地代码测试连接数据库
```js
// index.js
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});
```
7. 执行
```bash
node index.js
```
8. 当看到 
```js
Connected to the MySQL server.
```
就说明mysql正确部署完成。
9. 可能的其他问题
见"本地部署mysql过程中遇到的问题"；

### 最后
::: tip 恭喜
到这里就说明本地的mySQL安装完成，本地部署完成，本地测试连接正常！
接下来你就可以在mySQL GUI图形工具里面设计你的数据库表并进行后续开发了。
:::

