import { defineConfig } from 'vitepress';
import { applyPlugins } from '@ruabick/md-demo-plugins';
import { genTemp } from '@ruabick/vite-plugin-gen-temp';
import { genApiDoc } from '@ruabick/vite-plugin-gen-api-doc';
import { sidebar } from './sidebar.js';

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/longqi-ui' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '',
      description: '一个Vue3组件库',
    },
    '/en/': {
      lang: 'en-US',
      title: '',
      description: '一个Vue3组件库',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    localeLinks: {
      text: '',
      items: [
        { text: '简体中文', link: '/' },
        { text: 'English', link: '/en/' },
      ],
    },
    nav: [
        { text: '指南', link: '/guide/' },
        {
          text: "组件",
          items: [
            {text: 'form', link: '/components/form/'},
            {text: 'crud', link: '/components/crud/'},
          ]
        },
    ],
    sidebar,
    algolia: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/longshao5520/doc' },
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
