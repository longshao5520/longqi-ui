import Form from './index.vue'
import type {Plugin} from 'vue'

export type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(main: T,) => {
    (main as SFCWithInstall<T>).install = (app): void => {
        app.component('LqForm', main as any)
    }
    return main as SFCWithInstall<T>
}
export const LqForm = withInstall(Form)
export default LqForm
