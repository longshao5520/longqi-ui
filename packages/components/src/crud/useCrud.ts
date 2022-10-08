import {useProp} from "element-plus";
import lodash from "lodash"

interface Page {
    currentPage: number,
    pageSize: number,
    total: number,
    pagerCount: number,
    background: boolean,
    layout: "prev, pager, next, jumper, ->, total",
    pageSizes: Array<number>
}

export const useCrud = () => {
    let page = useProp<Page>('page').value as Page
    lodash.defaults(page, {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 7,
        background: true,
        layout: "total, prev, pager, next, jumper, ->, sizes",
        pageSizes: [10, 20, 30, 40, 50, 100]
    })
    console.log(page)

    return {page}
}
