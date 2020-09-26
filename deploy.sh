#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 创建一个空的git仓库或重新初始化一个现有仓库
git init
git add -A
git commit -m '提交改动，重新部署'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
git push -f https://github.com/HuangLotus/move-forward.git master:gh-pages

# 回到上一级工作目录
cd -

pwd
# 删除编译产物
rm -rf docs/.vuepress/dist
git add .
git ci -am "删除编译产物，并提交变更"
git ps origin master
