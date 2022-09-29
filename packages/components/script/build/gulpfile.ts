import { series, parallel } from 'gulp'
import {buildComponent, removeDist} from "./index";


export default series(
    async () => removeDist(),
    parallel(
        async () => buildComponent()
    )
)

