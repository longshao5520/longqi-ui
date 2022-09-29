import {componentPath} from '../utils/paths'
import run from '../utils/run'
import {dest, src} from 'gulp'
//复制
const copyPackage = async () => {
    return src(`${componentPath}/transitPkg/**`).pipe(dest(`${componentPath}/dist/`));
};
const copyReadme = async () => {
    return src(`${componentPath}/../../README.md`).pipe(dest(`${componentPath}/dist/`));
};
//发布组件
export const publish = async () => {
    //先给transitPkg升个版本
    await run('pnpm version patch', `${componentPath}/transitPkg`)
    //复制到dist目录
    await copyPackage()
    await copyReadme()
    //在dist下执行发布命令
    await run('npm publish --access=public', `${componentPath}/dist`)
    // run('pnpm publish')
}
