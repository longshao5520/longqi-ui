import { defineConfig } from 'vitepress';
import { applyPlugins } from '@ruabick/md-demo-plugins';
import { genTemp } from '@ruabick/vite-plugin-gen-temp';
import { genApiDoc } from '@ruabick/vite-plugin-gen-api-doc';
import { sidebar } from './sidebar.js';

export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'https://figure-bed-5520.oss-cn-hangzhou.aliyuncs.com/favicon.ico.png' }]
  ],
  lang: 'zh-CN',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/longqi-ui' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'longqi ui',
      description: '一个Vue3组件库',
    },
    '/en/': {
      lang: 'en-US',
      title: 'longqi ui',
      description: '一个Vue3组件库',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    siteTitle: "",
    // localeLinks: {
    //   text: '',
    //   items: [
    //     { text: '简体中文', link: '/' },
    //     { text: 'English', link: '/en/' },
    //   ],
    // },
    nav: [
        { text: '指南', link: '/guide/' },
        {
          text: "组件",
          items: [
            {text: 'Form', link: '/components/form/'},
            {text: 'Crud', link: '/components/crud/'},
          ]
        },
    ],
    sidebar,
    algolia: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/longshao5520/longqi-ui' },
    ],
  },
  vue: {},
  vite: {
    plugins: [genTemp(), genApiDoc()],
  },
  markdown: {
    config: (md) => {
      applyPlugins(md);
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
});
