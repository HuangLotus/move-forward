#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy blog'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
git push -f https://github.com/HuangLotus/move-forward.git master:gh-pages

# 回到上一级工作目录
cd -

pwd
# 删除编译产物
# 使用 " 2>&1" 把标准错误 stderr 重定向到标准输出 stdout，即捕获异常
# git rm -rf docs/.vuepress/dist 2>&1 
git add .
git ci -am "删除编译产物"
git ps origin master
