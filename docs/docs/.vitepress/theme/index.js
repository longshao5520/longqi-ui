// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
// 导入插件的主题
import LongQiUi from "longqi-ui";
import "vitepress-doc-plugin/style.css"
// import {Demo} from "vitepress-doc-plugin"
// // import "element-plus/dist/index.css";
export default {
    ...DefaultTheme,
    enhanceApp: async ({app, router, siteData, isServer}) => {
        app.use(LongQiUi)
        // app.component("Demo", Demo)
    },
};
