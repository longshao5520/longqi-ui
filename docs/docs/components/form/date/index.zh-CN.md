# Date日期

## 基础用法
<demo src="./basic.vue" desc="基本单位由type属性指定。快捷选项需配置pickerOptions对象中的shortcuts，禁用日期通过 disabledDate 设置，传入函数"></demo>

## 格式化

 [查看Day.js支持的format参数。](https://dayjs.gitee.io/docs/zh-CN/display/format)

<demo src="./valueFormat.vue" desc="使用format指定输入框的格式；使用valueFormat指定绑定值的格式。"></demo>

## 其他日期单位
<demo src="./otherDateUnits.vue" desc=""></demo>

## 日期范围
<demo src="./datetimerange.vue" desc=""></demo>

## 默认的起始与结束时刻

默认情况下，开始日期和结束日期的时间部分都是选择日期当日的`00:00:00`。 
通过`default-time`可以分别指定开始日期和结束日期的具体时刻。 
它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。
<demo src="./datetimerangeDefaultTime.vue" desc=""></demo>
