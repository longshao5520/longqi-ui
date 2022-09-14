import {App} from "vue";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import ElementPlus, {ElLoading, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

import LqForm from "./src/form";
import {isNil} from "lodash";

const components = [LqForm];

interface LocaleType {
    locale: "zh" | "en";
    size: string;
    zIndex: number
}

const install = (app: App, a: LocaleType) => {
    let option = {locale: zhLocale};
    if (!isNil(a)) {
        if (a.locale == "zh") {
            option = {locale: zhLocale};
        } else if (a.locale == "en") {
            option = {locale: enLocale};
        }
    }
    option = Object.assign(option, a)
    components.forEach((component: any) => {
        app.use(component.install);
    });
    app.use(ElementPlus, option);
};

export {ElMessage, ElLoading, ElMessageBox, ElNotification};

export {install, LqForm};

const LongQiUi = {install, LqForm}

export default LongQiUi;

// import * as components from './src/index'
// export * from './src/index'
// export default {
//     install: (app: any) => {
//         for (const comkey in components) {
//             app.component((components as any)[comkey].name, (components as any)[comkey])
//         }
//     }
// }
