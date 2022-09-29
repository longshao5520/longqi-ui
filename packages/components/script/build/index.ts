import { componentPath } from '../utils/paths'
import run from "../utils/run";

//删除dist
export const removeDist = () => {
    return run(`rm -rf ${componentPath}/dist`, componentPath)
}

//打包组件
export const buildComponent = async () => {
   await run('pnpm run build', componentPath)
}
