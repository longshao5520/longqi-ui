import {App} from "vue";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import ElementPlus, {ElLoading, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

import lodash from "lodash";
import {LqCrud, LqForm, LqUpload} from "./src";
import {defineLqForm} from './src/form/types'

const components = [LqForm, LqUpload, LqCrud];

interface LocaleType {
    locale: "zh" | "en";
    size: string;
    zIndex: number
}

const install = (app: App, a: LocaleType) => {
    let option = {locale: zhLocale};
    if (!lodash.isNil(a)) {
        if (a.locale == "zh") {
            option = {locale: zhLocale};
        } else if (a.locale == "en") {
            option = {locale: enLocale};
        }
    }
    option = Object.assign(option, a)
    components.map((component: any) => {
        app.component(component.name, component)
    });
    app.use(ElementPlus, option);
};

export {ElMessage, ElLoading, ElMessageBox, ElNotification};

export {install, LqForm, defineLqForm, LqUpload, LqCrud};

const LongQiUi = {install, LqForm, LqUpload, LqCrud}

export default LongQiUi;
