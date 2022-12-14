import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts';
import {resolve} from 'path'

export default defineConfig({
    build: {
        target: 'modules',
        //打包文件目录
        outDir: "es",
        //压缩
        minify: false,
        //css分离
        //cssCodeSplit: true,
        rollupOptions: {
            //忽略打包vue文件
            external: ['vue', '@longqi-ui/utils'],
            input: ['index.ts'],
            output: [
                {
                    format: 'es',
                    //不用打包成.es.js,这里我们想把它打包成.js
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    //配置打包根目录
                    dir: resolve(__dirname, './dist/es'),
                    // preserveModulesRoot: 'src'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    //配置打包根目录
                    dir: resolve(__dirname, './dist/lib'),
                    // preserveModulesRoot: 'src'
                }
            ]
        },
        lib: {
            entry: './index.ts',
            name: 'longqi'
        }
    },
    plugins: [
        vue(),
        dts({
            entryRoot: 'src',
            outputDir: [resolve(__dirname, './dist/es/src'), resolve(__dirname, './dist/lib/src')],
            //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
            tsConfigFilePath: '../../tsconfig.json'
        }),
    ]
})
