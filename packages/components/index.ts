import {App} from "vue";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import ElementPlus, {ElLoading, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

import lodash from "lodash";
import {LqCrud, LqForm, LqImageList, LqUpload} from "./src";
import {defineLqForm} from './src/types'

console.log(LqImageList)
const components = [LqForm, LqUpload, LqCrud, LqImageList];

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
        console.log(component)
        app.component(component.name, component)
    });
    app.use(ElementPlus, option);
};

export {ElMessage, ElLoading, ElMessageBox, ElNotification};

export {install, LqForm, defineLqForm, LqUpload, LqCrud, LqImageList};

const LongQiUi = {install, LqForm, defineLqForm, LqUpload, LqCrud, LqImageList}

export default LongQiUi;
