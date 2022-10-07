# Select选择框

## 基础用法
<demo src="./basic.vue" desc="通过将type属性的值指定为select,同时配置dicData为字典值"></demo>

## 默认值
<demo src="./defaultValue.vue" desc="value属性可以提供一个初始化的默认值"></demo>

## 禁用
<demo src="./disabled.vue" desc="通过 disabled 属性指定是否禁用"></demo>

## 禁用选项
<demo src="./disabledItem.vue" desc="字典中数据配置disabled属性指定是否禁用"></demo>

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

设置`multiple`属性即可启用多选， 此时`value`的值为当前选中值所组成的数组。

默认情况下选中值会以 Tag 的形式展现， 你也可以设置`collapseTags`属性将它们合并为一段文字。

您可以使用`collapseTagsTooltip`属性来启用鼠标悬停折叠文字以显示具体所选值的行为。
<demo src="./multiple.vue"></demo>

## 筛选选项
可以利用筛选功能快速查找选项

添加`filterable`属性即可启用筛选功能。 默认情况下，`Select`会找出所有`label`属性包含输入值的选项。

<demo src="./filterable.vue"></demo>

## 创建新的选项
可以创建并选中选项中不存在的条目

通过使用`allowCreate`属性，用户可以通过输入框创建新项目。为了使 `allowCreate`正确的工作，`filterable`的值必须为 `true`。
<demo src="./allowCreate.vue"></demo>
