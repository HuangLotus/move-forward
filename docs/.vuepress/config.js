module.exports = {
    title: '小小芙的部落格',
    description: '工作笔记',
    base: '/move-forward/',
    markdown: {
        lineNumbers: true,
        toc: { includeLevel: [1, 2] },
    },
    evergreen: true,
    themeConfig: {
        logo: '/public/imgs/cat.jpeg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: '关于', link: '/about/' },
            { text: 'github', link: 'https://github.com/HuangLotus' },
        ],
        sidebar: [
            '/',
            '/about',
            ['/page-b', 'Explicit link text']
        ]
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@alias': 'path/to/some/dir'
          }
        }
    }
}