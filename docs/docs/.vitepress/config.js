// import { markdownConfig } from "vitepress-doc-plugin"
export default {
    // markdown: {
    //     config: markdownConfig
    // },
    themeConfig: {
        siteTitle: false,
        logo: "/logo.png",
        nav: [
            {text: "指南", link: "/guild/installation.md"},
            {
                text: "组件",
                items: [
                    {text: 'form', link: '/form/'},
                    {text: 'crud', link: '/crud/'},
                ]
            },
        ],
        socialLinks: [
            {icon: "github", link: "https://gitee.com/geeksdidi"},
        ],
        sidebar: {
            "/guild/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "安装",
                            link: "/guild/installation.md",
                        },
                        {
                            text: "快速开始",
                            link: "/guild/quickstart.md",
                        },
                    ],
                },
            ],
            "/form/": [
                {
                    text: "属性文档",
                    items: [
                        {text: "属性文档", link: "/form/index.md",},
                    ]
                },
                {
                    text: "单组件",
                    items: [
                        {text: '输入框', link: '/form/input.md'}
                    ]
                },
            ],
            "/crud/": [
                {
                    text: "属性文档",
                    items: [
                        {text: "属性文档", link: "/form/index.md",},
                    ]
                },
            ],
        },
    },
};
