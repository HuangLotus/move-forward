(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{208:function(t,s,n){"use strict";n.r(s);var e=n(6),a=Object(e.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h3",{attrs:{id:"组件库按需加载原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#组件库按需加载原理"}},[t._v("#")]),t._v(" 组件库按需加载原理")]),t._v(" "),n("p",[t._v("所以想要实现按需加载，需要打包生成的文件有esm的目录。")]),t._v(" "),n("p",[t._v("实现步骤：")]),t._v(" "),n("ul",[n("li",[t._v("需要打包生成的文件有esm的目录")])]),t._v(" "),n("p",[t._v("babel-plugin-import 就是解决了上面的问题，为组件库实现单组件按需加载并且自动引入其样式。")]),t._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("import { Button } from 'antd';\n \n      ↓ ↓ ↓ ↓ ↓ ↓\n \nvar _button = require('antd/lib/button');\nrequire('antd/lib/button/style');\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br")])]),n("p",[t._v("最简单的“按需加载组件”实现方式，就是在应用中直接引用所需组件的源文件，在应用的构建工具中跟应用一起构建。说它简单，是因为这种方式几乎不需要组件库做什么工作，应用直接引用组件源码，并不需要经过组件库的构建过程.")])])}),[],!1,null,null,null);s.default=a.exports}}]);