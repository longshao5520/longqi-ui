import Form from './src/index.vue'

import type {Plugin} from 'vue'

export type SFCWithInstall<T> = T & Plugin

const withInstall = <T, E extends Record<string, any>>(
    main: T,
) => {
    (main as SFCWithInstall<T>).install = (app): void => {
        app.component((main as any).name, main as any)
    }
    return main as SFCWithInstall<T> & E
}
export const LqForm = withInstall(Form)
export default LqForm

export * from './src/index.vue'
