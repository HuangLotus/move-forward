module.exports = {
    title: '风若能够',
    description: '工作笔记',
    base: '/move-forward/',
    markdown: {
        lineNumbers: true,
        toc: { includeLevel: [1, 2] },
    },
    evergreen: true,
    themeConfig: {
        logo: '/imgs/cat.jpeg',
        nav: [
            { text: '首页', link: '/' },
            { text: '踩坑经验', link: '/summary/' },
            { text: '前端基础', link: '/basement/' },
            { text: 'github', items: [
                {
                    text: '踩坑issues',
                    link: 'https://github.com/HuangLotus/move-forward/issues'
                }
            ] 
            },
            { text: '关于', link: '/about/' }
        ],
        sidebar: [
            {
                title: '踩坑经验',   // 必要的
                path: '/summary',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                // sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/summary/那些不清楚的知识点梳理'
                ],
                initialOpenGroupIndex: 1
            },
            {
                title: '平台架构',
                path: '/platform',
                children: [
                    '/platform/如何规划一个node平台'
                ],
                collapsable: false,
                initialOpenGroupIndex: 1
            },
            {
                title: '学习笔记',
                path: '/mynote', 
                children: [
                    '/mynote/理解vue核心概念',
                    '/mynote/对webpack热更新的理解',
                    '/summary/那些不清楚的知识点梳理',
                    '/platform/如何规划一个node平台'
                ],
                collapsable: false, 
                initialOpenGroupIndex: 1 
            },
            {
                title: '开始的话',   // 必要的
                path: '/first/新博客第一篇',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, 
                sidebarDepth: 1,  
            }
        ],
        lastUpdated: '最后更新时间', // string | boolean
        // repo: 'https://github.com/HuangLotus/move-forward',
        // repoLabel: 'github',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '帮我改善此页面',
        smoothScroll: true,
        displayAllHeaders: true,
        sidebarDepth: 2
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@alias': 'public/imgs/'
          }
        }
    }
}