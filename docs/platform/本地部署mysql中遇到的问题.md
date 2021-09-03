### 本地部署mysql过程中遇到的问题
当一切就绪，准备连接mysql的时候可能会出现各种问题，下面就单独列出来看一下：

#### 问题1
如果下面的问题，比如：
```bash
error: connect ECONNREFUSED 127.0.0.1:3306
```
到系统偏好设置里面，找到mysql，启动mysql;
启动完毕之后再在node中链接mysql出现新的问题：
```bash
error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
解决方法：
1. 终端启动mysql:
mysql -u root -p
输入密码后，但是:
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
2. 解决方法：
 - 打开系统偏好设置，关闭mysql的服务（Stop Mysql Serve）
 - cd /usr/local/mysql/bin
 - sudo su
 - ./mysqld_safe --skip-grant-tables &
3. 新建一个终端，输入命令: /usr/local/mysql/bin/mysql 回车后显示：
```bash
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 7
Server version: 8.0.21 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```
* 接着输入：
mysql> use mysql
* 可以更新root密码：
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'
* 退出mysql:
mysql> exit

至此终端登录mysql完成，但是最上面的问题并没有彻底解决；
#### 遗留问题
1. 但是在node index.js中连接数据库还是有上面的第一个错误，😅
且在终端执行了这sql命令后还是无效：
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
上面的问题还是存在；
2. 且mysql workbench还是链接不上3306的数据库；
- 解决方法
权限问题，见下面的 * 终极解决步骤 *

#### 问题2
我的基于eggjs项目里面也同样链接不上mysql服务器，报错：
```bash
6462 nodejs.SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306
```
##### 解决方法
```js
config.sequelize = {
     dialectOptions: {
        socketPath: '/tmp/mysql.sock', // 指定套接字文件路径
     },
 }
```
修复后能链接数据库了，又出现另外一个问题：
```js
ERROR 54111 nodejs.SequelizeConnectionError: Unknown database 'cml_native_platform_db'
```
##### 解决方法
CREATE DATABASE IF NOT EXISTS cml_native_platform_db
但是无效，经查可能是权限问题；
##### 终极解决步骤
1. 关闭mysql，重启mysql（重启mysql用系统偏好设置中的mysql启动）
2. 点击“initialize dababase”后一定选择“use legacy passport encryption”（这是最关键的一个步骤，所有的权限问题都和这相关）
3. 经过步骤2后，node中也能直接连接数据库了，终端中输入mysql命令后也能创建数据库了，mysql workbench也能连接本地数据库了；

#### 最后的感想
这个mysql的配置花了不少时间去折腾。
- 第一天安装mysql后，node中测试是能直接连接数据库的，以为大功告成；
- 第二天再测试时，就无法连接了，慌乱中网上查找解决方法，好多种的情况，一一试过之后还是行不通，无奈作罢；
- 第三天实在不行又继续折腾，最后找小伙伴帮忙定位原因，一时还是没找到解决方法；
- 最后在重启数据库时点击“initialize database”时小伙伴提醒选下面这一个选项，即“use legacy passport encryption”，找到真正的问题所在；
- 原来前两天的折腾都是因为mysql本地配置的权限问题导致；
- 所以这也能解释我的mysql安装是没有问题的，只是权限问题，虽然这期间mysql安装卸载反复了好几次；
- 最后可以在本地愉快的写mysql了，安装完成！

[参考文档](https://www.cnblogs.com/benbenzhu/p/5578162.html)

