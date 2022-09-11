import { App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import zhLocale from "element-plus/dist/locale";
// import enLocale from "element-plus/lib/locale/lang/en";

import {
    ElMessage,
    ElLoading,
    ElMessageBox,
    ElNotification
} from "element-plus";

import LqForm from "./form";

const components = [LqForm];

interface LocaleType {
    locale: "zh" | "en";
}

const install = (app: App, a: LocaleType) => {
    // let locale = {};
    // if (a.locale == "zh") {
    //     locale = { locale: zhLocale };
    // } else if (a.locale == "en") {
    //     locale = { locale: enLocale };
    // } else {
    //     locale = {};
    // }
    components.forEach((component: any) => {
        app.use(component.install);
    });
    app.use(ElementPlus);
};

export { ElMessage, ElLoading, ElMessageBox, ElNotification };

export { install, LqForm };

export default { install, LqForm };

// import * as components from './src/index'
// export * from './src/index'
// export default {
//     install: (app: any) => {
//         for (const comkey in components) {
//             app.component((components as any)[comkey].name, (components as any)[comkey])
//         }
//     }
// }
