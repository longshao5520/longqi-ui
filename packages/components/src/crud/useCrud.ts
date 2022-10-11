import {useProp} from "element-plus";
import lodash from "lodash"
import {CrudColumn, LqCrudOptions} from "../types";
import {Component, markRaw} from 'vue'
import {Delete, Edit, Plus, View} from '@element-plus/icons-vue'

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
    let options = useProp<LqCrudOptions>('option').value as LqCrudOptions

    // 配置初始化
    const defaultOption = {
        size: 'default',
        rowHeight: "50px",
        // card: true,

        addBtn: true,
        addBtnText: "新增",
        addBtnType: "primary",
        addBtnIcon: markRaw(Plus) as Component,
        editBtn: true,
        editBtnText: "编辑",
        editBtnType: "primary",
        editBtnIcon: markRaw(Edit) as Component,
        delBtn: true,
        delBtnText: "删除",
        delBtnType: "danger",
        delBtnIcon: markRaw(Delete) as Component,
        viewBtn: true,
        viewBtnText: "查看",
        viewBtnType: "primary",
        viewBtnIcon: markRaw(View) as Component,

        menu: true,
        menuTitle: "操作",
        menuAlign: "center",
        menuWidth: 260,

        indexWidth: 50,
        expandWidth: 50,
        selectionWidth: 50,
    } as LqCrudOptions
    lodash.defaults(options, defaultOption)
    options.column.map(item => {
        lodash.defaults(item, {
            align: 'center'
        } as CrudColumn)
    })

    let pageModel = useProp<Page>('page').value as Page
    lodash.defaults(pageModel, {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 7,
        background: true,
        layout: "total, sizes, prev, pager, next, jumper, ->",
        pageSizes: [10, 20, 30, 40, 50, 100]
    })

    return {options, pageModel}
}
